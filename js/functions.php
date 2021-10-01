<?php
/**
 * LiketsLabels functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package LiketsLabels
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
}

if ( ! function_exists( 'liketslabels_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function liketslabels_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on LiketsLabels, use a find and replace
		 * to change 'liketslabels' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'liketslabels', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus(
			array(
				'menu-1' => esc_html__( 'Primary', 'liketslabels' ),
			)
		);

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
				'style',
				'script',
			)
		);

		// Set up the WordPress core custom background feature.
		add_theme_support(
			'custom-background',
			apply_filters(
				'liketslabels_custom_background_args',
				array(
					'default-color' => 'ffffff',
					'default-image' => '',
				)
			)
		);

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support(
			'custom-logo',
			array(
				'height'      => 250,
				'width'       => 250,
				'flex-width'  => true,
				'flex-height' => true,
			)
		);
	}
endif;
add_action( 'after_setup_theme', 'liketslabels_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function liketslabels_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'liketslabels_content_width', 640 );
}
add_action( 'after_setup_theme', 'liketslabels_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function liketslabels_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'liketslabels' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'liketslabels' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'liketslabels_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function liketslabels_scripts() {
	
	wp_enqueue_script('jquery');
	wp_enqueue_script( 'sft_core', get_template_directory_uri() . '/js/sft_core.js', array('jquery_slim','owl_car'), '1.0.14', true );
	wp_enqueue_script( 'jquery_slim', get_template_directory_uri() . '/js/jquery-3.6.0.slim.min.js.js', array(), '1.0.4', true );
	wp_enqueue_script( 'owl_car', get_template_directory_uri() . '/js/owl.carousel.min.js', array('jquery_slim'), '1.0.4', true );


	wp_style_add_data( 'liketslabels-style', 'rtl', 'replace' );

	wp_enqueue_script( 'liketslabels-navigation', get_template_directory_uri() . '/js/navigation.js', array(), _S_VERSION, true );
	wp_enqueue_style( 'owl_style', get_template_directory_uri() . '/owl.carousel.min.css', array(), '1.0.8', false);
	wp_enqueue_style( 'liketslabels-style', get_stylesheet_uri(), array(), _S_VERSION );
	wp_enqueue_style( 'liketslabels_style', get_template_directory_uri() . '/main.min.css', array(), '1.0.13', false);


	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'liketslabels_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

// регистрация меню сайта
add_action( 'after_setup_theme', 'sft_theme_register_top_menu' );
function sft_theme_register_top_menu() {
	register_nav_menu( 'Основное меню', 'Основное меню' );
}

//Подключение стилей и JS кода

// add_action( 'wp_enqueue_scripts', 'sft_init_style_js' );

// function sft_init_style_js() {
// 	wp_enqueue_style( 'liketslabels_style', get_template_directory_uri() . '/main.min.css', array(), '1.0.8', false);
// 	wp_enqueue_script( 'sft_core', get_template_directory_uri() . '/js/sft_core.js', array('jquery_slim','owl_car'), '1.0.2', true );
// 	wp_enqueue_script( 'jquery_slim', get_template_directory_uri() . '/js/jquery-3.6.0.slim.min.js.js', array(), '1.0.2', true );
// 	wp_enqueue_script( 'owl_car', get_template_directory_uri() . '/js/owl.carousel.min.js', array('jquery_slim'), '1.0.2', true );
// }

//автоматическое обновление корзины
add_filter('woocommerce_add_to_cart_fragments', 'header_add_to_cart_fragment');

function header_add_to_cart_fragment( $fragments ) {
    global $woocommerce;
    ob_start();
    ?>
<span class="basket-btn__counter">(<?php echo sprintf($woocommerce->cart->cart_contents_count); ?>)</span>
<?php
    $fragments['.basket-btn__counter'] = ob_get_clean();
    return $fragments;
}

//Загрузка SVG

add_filter( 'upload_mimes', 'svg_upload_allow' );

# Добавляет SVG в список разрешенных для загрузки файлов.
function svg_upload_allow( $mimes ) {
	$mimes['svg']  = 'image/svg+xml';

	return $mimes;
}
add_filter( 'wp_check_filetype_and_ext', 'fix_svg_mime_type', 10, 5 );

# Исправление MIME типа для SVG файлов.
function fix_svg_mime_type( $data, $file, $filename, $mimes, $real_mime = '' ){

	// WP 5.1 +
	if( version_compare( $GLOBALS['wp_version'], '5.1.0', '>=' ) )
		$dosvg = in_array( $real_mime, [ 'image/svg', 'image/svg+xml' ] );
	else
		$dosvg = ( '.svg' === strtolower( substr($filename, -4) ) );

	// mime тип был обнулен, поправим его
	// а также проверим право пользователя
	if( $dosvg ){

		// разрешим
		if( current_user_can('manage_options') ){

			$data['ext']  = 'svg';
			$data['type'] = 'image/svg+xml';
		}
		// запретим
		else {
			$data['ext'] = $type_and_ext['type'] = false;
		}

	}

	return $data;
}