<?php

function print_views($view_name, $display_id, $arg = array()) {
  $delta = $view_name . '-' . $display_id;
  $nodeblock = array($delta);
  $block = block_load('views', $delta);
  $block->subject = "";
  $views = views_get_view($view_name);
  $views->set_display($display_id);
  $views->set_arguments($arg);
//    $views->set_current_page($_GET['page']); //set page number
  $views->pre_execute();
  $b = $views->display_handler->execute();
  $views->post_execute();
  views_add_block_contextual_links($b, $views, $display_id); //add views contextual link
  $nodeblock[$delta] = $b['content'];
  $nodeblock[$delta]['#block'] = $block;
  $nodeblock[$delta]['#theme_wrappers'] = array('block');
  $nodeblock['#sort'] = TRUE;
  return drupal_render($nodeblock); //theme as block
}
?>
<h3 class="headline">We work as one international team with over 40 talented people working from our studios in Hong Kong, London, Shanghai and Singapore.</h3>
<section id="outmanagement">
  <nav class="control">
    <div class="control-wrap">
      <a class="current" href="#outmanagement">Our Management</a>
      <a href="#ourteam">Our Team</a>
    </div>
  </nav>
  <div>
<?php print print_views('our_people', 'our_management'); ?>
  </div>
</section>

<section id="ourteam">
  <nav class="control">
    <div class="control-wrap">
      <a href="#outmanagement">Our Management</a>
      <a class="current" href="#ourteam">Our Team</a>
    </div>
  </nav>
  <div>
<?php print print_views('our_people', 'our_team'); ?>
  </div>
</section>