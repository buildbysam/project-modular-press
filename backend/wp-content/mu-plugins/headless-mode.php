<?php
/**
 * Plugin Name:  Headless Mode
 * Description:  Forces WP into headless mode and requires a secret header for GraphQL.
 * Version:      2.0.0
 * Author:       Sijal Manandhar 
 */

if (!defined('ABSPATH'))
    exit;


/**
 * Require Secret Header for GraphQL
 */
add_action('graphql_process_http_request', function () {
    if (is_user_logged_in() && current_user_can('manage_options')) {
        return;
    }

    $secret_key = env('HEADLESS_SECRET_KEY') ?: '';
    if (empty($secret_key)) {
        wp_die(
            'Security Error: HEADLESS_SECRET_KEY is not defined in .env or server environment.',
            'Unauthorized',
            ['response' => 401]
        );
    }

    $provided_key = $_SERVER['HTTP_X_HEADLESS_SECRET'] ?? '';
    if (strpos($provided_key, 'Bearer ') === 0) {
        $provided_key = trim(substr($provided_key, 7));
    }

    if ($provided_key !== $secret_key) {
        header('Content-Type: application/json');
        status_header(401);
        echo json_encode(['error' => 'Invalid or missing secret key header.']);
        exit;
    }
}, 10);


/**
 * Block public access
 */
add_filter('rest_authentication_errors', function ($result) {
    if (!empty($result))
        return $result;
    if (!is_user_logged_in()) {
        return new WP_Error('rest_not_logged_in', 'Access Restricted.', ['status' => 401]);
    }
    return $result;
});


/**
 * Kill frontend theme rendering
 */
add_action('template_redirect', function () {
    if (is_admin() || defined('REST_REQUEST') || defined('GRAPHQL_REQUEST') || is_preview()) {
        return;
    }
    status_header(404);
    die("Headless Mode Active. Use /graphql for data.");
}, 0);



/**
 * CORS: Allow specific origins (Browser safety)
 */
add_filter('graphql_response_headers', function ($headers) {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $allowed_origins = [
        'http://localhost:3000',
    ];

    if (in_array($origin, $allowed_origins, true)) {
        $headers['Access-Control-Allow-Origin'] = $origin;
        $headers['Access-Control-Allow-Credentials'] = 'true';
        $headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Headless-Secret';
        $headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
    }

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        status_header(204);
        exit;
    }

    return $headers;
}, 20);

/**
 * Reading Time & Excerpts
 */
add_action('graphql_register_types', function () {
    register_graphql_field('Post', 'readingTimeMinutes', [
        'type' => 'Int',
        'resolve' => function ($post) {
            $content = get_post_field('post_content', $post->databaseId);
            $words = str_word_count(strip_tags($content));
            return (int) ceil($words / 200);
        },
    ]);

    register_graphql_field('Post', 'betterExcerpt', [
        'type' => 'String',
        'resolve' => function ($post) {
            $excerpt = get_the_excerpt($post->databaseId);
            return !empty(trim($excerpt)) ? $excerpt : wp_trim_words(strip_tags(get_post_field('post_content', $post->databaseId)), 55, '...');
        },
    ]);
});