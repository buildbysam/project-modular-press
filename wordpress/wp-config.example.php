<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

function env($key, $default = null)
{
	return $_SERVER[$key] ?? $_ENV[$key] ?? $default;
}

$dotenv_path = __DIR__ . '/.env.local';

if (file_exists($dotenv_path) && file_exists(__DIR__ . '/vendor/autoload.php')) {
	require_once __DIR__ . '/vendor/autoload.php';
	$dotenv = Dotenv\Dotenv::createImmutable(__DIR__, '.env.local');
	$dotenv->safeLoad();
}

$env_type = env('WP_ENVIRONMENT_TYPE') ?: 'local';
define('WP_ENVIRONMENT_TYPE', $env_type);


define('DB_NAME', env('DB_NAME') ?: 'wordpress');
define('DB_USER', env('DB_USER') ?: 'root');
define('DB_PASSWORD', env('DB_PASSWORD') ?: '');
define('DB_HOST', env('DB_HOST') ?: 'localhost');
define('DB_CHARSET', env('DB_CHARSET') ?: 'utf8mb4');
define('DB_COLLATE', env('DB_COLLATE') ?: '');

if ($home = env('WP_HOME')) {
	define('WP_HOME', rtrim($home, '/'));
}
if ($siteurl = env('WP_SITEURL')) {
	define('WP_SITEURL', rtrim($siteurl, '/'));
}


$is_dev_env = in_array($env_type, ['local', 'development'], true);

define('WP_DEBUG', $is_dev_env);
define('WP_DEBUG_LOG', $is_dev_env || $env_type === 'staging');
define('WP_DEBUG_DISPLAY', false);

if (WP_DEBUG) {
	define('SCRIPT_DEBUG', true);
	define('SAVEQUERIES', true);
}

$fallback = 'put-your-unique-random-string-here-32-chars-minimum';

define('AUTH_KEY', env('AUTH_KEY') ?: $fallback);
define('SECURE_AUTH_KEY', env('SECURE_AUTH_KEY') ?: $fallback);
define('LOGGED_IN_KEY', env('LOGGED_IN_KEY') ?: $fallback);
define('NONCE_KEY', env('NONCE_KEY') ?: $fallback);
define('AUTH_SALT', env('AUTH_SALT') ?: $fallback);
define('SECURE_AUTH_SALT', env('SECURE_AUTH_SALT') ?: $fallback);
define('LOGGED_IN_SALT', env('LOGGED_IN_SALT') ?: $fallback);
define('NONCE_SALT', env('NONCE_SALT') ?: $fallback);

$table_prefix = env('DB_PREFIX') ?: 'wp_';

define('DISALLOW_FILE_EDIT', true);
define('DISALLOW_FILE_MODS', true);


if ($env_type === 'production') {
	define('WP_AUTO_UPDATE_CORE', false);
	define('AUTOMATIC_UPDATER_DISABLED', true);
}

if (!defined('ABSPATH')) {
	define('ABSPATH', __DIR__ . '/');
}

require_once ABSPATH . 'wp-settings.php';