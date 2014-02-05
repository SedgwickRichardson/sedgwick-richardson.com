<?php
/**
 * @file
 * Zen theme's implementation to display a single Drupal page.
 *
 * Available variables:
 *
 * General utility variables:
 * - $base_path: The base URL path of the Drupal installation. At the very
 *   least, this will always default to /.
 * - $directory: The directory the template is located in, e.g. modules/system
 *   or themes/bartik.
 * - $is_front: TRUE if the current page is the front page.
 * - $logged_in: TRUE if the user is registered and signed in.
 * - $is_admin: TRUE if the user has permission to access administration pages.
 *
 * Site identity:
 * - $front_page: The URL of the front page. Use this instead of $base_path,
 *   when linking to the front page. This includes the language domain or
 *   prefix.
 * - $logo: The path to the logo image, as defined in theme configuration.
 * - $site_name: The name of the site, empty when display has been disabled
 *   in theme settings.
 * - $site_slogan: The slogan of the site, empty when display has been disabled
 *   in theme settings.
 *
 * Navigation:
 * - $main_menu (array): An array containing the Main menu links for the
 *   site, if they have been configured.
 * - $secondary_menu (array): An array containing the Secondary menu links for
 *   the site, if they have been configured.
 * - $secondary_menu_heading: The title of the menu used by the secondary links.
 * - $breadcrumb: The breadcrumb trail for the current page.
 *
 * Page content (in order of occurrence in the default page.tpl.php):
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title: The page title, for use in the actual HTML content.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 * - $messages: HTML for status and error messages. Should be displayed
 *   prominently.
 * - $tabs (array): Tabs linking to any sub-pages beneath the current page
 *   (e.g., the view and edit tabs when displaying a node).
 * - $action_links (array): Actions local to the page, such as 'Add menu' on the
 *   menu administration interface.
 * - $feed_icons: A string of all feed icons for the current page.
 * - $node: The node object, if there is an automatically-loaded node
 *   associated with the page, and the node ID is the second argument
 *   in the page's path (e.g. node/12345 and node/12345/revisions, but not
 *   comment/reply/12345).
 *
 * Regions:
 * - $page['header']: Items for the header region.
 * - $page['navigation']: Items for the navigation region, below the main menu (if any).
 * - $page['help']: Dynamic help text, mostly for admin pages.
 * - $page['highlighted']: Items for the highlighted content region.
 * - $page['content']: The main content of the current page.
 * - $page['sidebar_first']: Items for the first sidebar.
 * - $page['sidebar_second']: Items for the second sidebar.
 * - $page['footer']: Items for the footer region.
 * - $page['bottom']: Items to appear at the bottom of the page below the footer.
 *
 * @see template_preprocess()
 * @see template_preprocess_page()
 * @see zen_preprocess_page()
 * @see template_process()
 */
if ($is_front) {
  $title = ''; // This is optional ... it removes the default Welcome to @site-name
  $GLOBALS['conf']['cache'] = FALSE;
  $page['content']['system_main']['default_message'] = array(); // This will remove the 'No front page content has been created yet.'
}
?>

<div id="page">

  <header id="header" role="banner">
    <div id="header-top-wrap">
      <div id="header-top">
        <div id="header-left">

          <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home" id="logo"><div></div></a>
          <div id="triangle-hotspot"></div>
          <!--            <a href="#" id="main-menu-trigger" class="trigger">toggle main-menu</a>-->
          <div id="header-left-pulldown">
            <nav id="main-menu" role="navigation">
              <?php print render($page['main_menu']); ?>
            </nav>
          </div>
        </div>

        <?php 
        print render($page['breadcrumb']);
        ?>

        <div id="header-right">
          <ul id="header-right-menu">
            <li id="search-li">
              <div id="search-area">
                <a href="#search" id="search-trigger" class="trigger">Search</a>
                <nav id="search" role="navigation">
                  <?php print render($page['search']); ?>
                </nav>
              </div>
            </li>
            <!--<li><a href="#" id="blog-trigger" class="trigger">Blog</a></li>-->
            <li><a href="#social" id="social-trigger" class="trigger">Share</a></li>
          </ul>
          <div id="header-right-pulldown">
            <nav id="social" role="navigation">
              <?php print render($page['social']); ?>
            </nav>
            <a href="#" id="header-right-pulldown-close"></a>
          </div>
        </div>
      </div>
    </div>
    <div id="header-bottom-wrap">
      <div id="header-bottom">
        <?php print render($page['main_menu_sub']); ?>
      </div>
    </div>

    <?php
    $path = isset($_GET['q']) ? $_GET['q'] : '<front>';
    if ($path == 'why-sr/thought-leadership' || $path == 'news') {
      echo '<div id="header-bg"></div>';
    }
    ?>

  </header>

  <div id="main" class="<?php if (isset($page['sidebar']['#region'])) echo "hasSidebar"; ?>">
    <div id="content" class="column" role="main">
      <?php print $messages; ?>
      <?php print render($tabs); ?>
      <?php print render($page['help']); ?>
      <?php if ($action_links): ?>
        <ul class="action-links"><?php print render($action_links); ?></ul>
      <?php endif; ?>
      <?php print render($page['isotope_filter']); ?>
      <?php
//      dpm(render($page['sidebar']));
      if (isset($page['sidebar'])) {
        $html = render($page['sidebar']);
        phpQuery::newDocumentHTML($html);
        pq('.block')->wrapAll('<div class="content" />');
        print pq(':eq(0)')->htmlOuter();

      }
      ?>
      <?php print render($page['content']); ?>
    </div>

  </div>

  <footer id="footer">
    <div id="footer-wrap">
      <div id="footer-top">
        <nav id="footer-menu-1">
          <?php //print render($page['footer_menu_1']);    ?>
          <div class="region region-footer-menu-1">
            <div role="navigation" class="block block-menu contextual-links-region first last odd" id="block-menu-menu-footer-menu1">
              <ul class="menu">
                <li class="first leaf"><a href="/our-work#filter=.branding">Branding</a></li>
                <li class="leaf"><a href="/our-work#filter=.reporting">Reporting</a></li>
                <li class="last leaf"><a href="/our-work#filter=.digital">Digital</a></li>
              </ul>
            </div>
          </div>
        </nav>
        <nav id="footer-menu-2">
          <?php print render($page['footer_menu_2']); ?>
        </nav>
      </div>

      <div id="footer-bottom">
        <div id="copyright">
          <h3>Inspiring brand performance™</h3>
          <h4>© 2014 Sedgwick Richardson</h4>
        </div>
        <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home" id="footer-logo"><div></div></a>
      </div>
    </div>
  </footer>

</div>