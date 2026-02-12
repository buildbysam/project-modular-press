<?php
/**
 * Plugin Name:   Headless Mode – Blog Only
 * Description:   Forces WordPress into pure headless API mode (GraphQL/REST only).  
 *                Disables theme rendering, removes frontend bloat, adds dev CORS headers.
 * Version:       1.1.0
 * Author:        Sijal Manandhar
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Kill frontend rendering attempts 
 */
add_action('template_redirect', function () {
    // Allow admin, REST API, GraphQL, and preview requests
    if (
        is_admin() ||
        defined('REST_REQUEST') ||
        defined('GRAPHQL_REQUEST') ||
        is_preview() ||
        doing_action('wp_ajax_nopriv_') ||
        doing_action('wp_ajax_')
    ) {
        return;
    }

    status_header(404);
    nocache_headers();
    header('Content-Type: text/plain');
    echo "This is a headless WordPress installation.\nUse the GraphQL endpoint: /graphql";
    exit;
}, 0);


/**
 * Remove unnecessary <head> bloat
 */
add_action('init', function () {
    remove_action('wp_head', 'wp_generator');

    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wlwmanifest_link');

    remove_action('wp_head', 'wp_shortlink_wp_head', 10);

    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');

    remove_action('wp_head', 'wp_oembed_add_discovery_links');

    remove_action('wp_head', 'feed_links', 2);
    remove_action('wp_head', 'feed_links_extra', 3);
}, 999);


/**
 * Disable XML-RPC 
 */
add_filter('xmlrpc_enabled', '__return_false');


/**
 * Improve CORS headers for local GraphQL development
 */
add_filter('graphql_response_headers', function ($headers) {

    // Get the request origin
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    $allowed_origins = [
        'http://localhost:3000',
    ];

    if (in_array($origin, $allowed_origins, true)) {
        $headers['Access-Control-Allow-Origin'] = $origin;
        $headers['Access-Control-Allow-Credentials'] = 'true';
        $headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-WP-Nonce';
        $headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
        $headers['Access-Control-Max-Age'] = '86400'; // cache preflight 24h
    }

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }

    return $headers;

}, 20);

/**
 * Disable theme-related features that are irrelevant in headless mode
 */
add_filter('show_admin_bar', '__return_false'); // hide admin bar on frontend (if somehow loaded)
remove_theme_support('core-block-patterns');
remove_theme_support('widgets');


/**
 * Force login redirect away from frontend
 */
add_filter('login_redirect', function ($redirect_to, $request, $user) {
    return admin_url();
}, 10, 3);


/**
 * Add a small debug header to know headless mode is active
 */
add_action('wp_headers', function ($headers) {
    $headers['X-Headless-Mode'] = 'active';
    return $headers;
});

/**
 * Security: Disable introspection & public mutations in production
 */
if (defined('WP_ENVIRONMENT_TYPE') && WP_ENVIRONMENT_TYPE === 'production') {
    add_filter('graphql_should_send_introspection_query', '__return_false');
    add_filter('graphql_access_control_allow_public_mutations', '__return_false');

}

add_action('graphql_register_types', function () {
    // Reading time (calculated from content)
    register_graphql_field('Post', 'readingTimeMinutes', [
        'type' => 'Int',
        'description' => 'Estimated reading time (~200 words per minute)',
        'resolve' => function ($post) {
            $content = get_post_field('post_content', $post->databaseId);
            $words = str_word_count(strip_tags($content));
            return (int) ceil($words / 200);
        },
    ]);

    // fallback to manual excerpt if auto-generated is empty
    register_graphql_field('Post', 'betterExcerpt', [
        'type' => 'String',
        'description' => 'Clean excerpt with fallback to first 55 words',
        'resolve' => function ($post) {
            $excerpt = get_the_excerpt($post->databaseId);
            if (empty(trim($excerpt))) {
                $content = get_post_field('post_content', $post->databaseId);
                $excerpt = wp_trim_words(strip_tags($content), 55, '...');
            }
            return $excerpt;
        },
    ]);

});