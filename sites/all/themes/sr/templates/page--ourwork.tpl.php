<?php
//echo $block = drupal_render(module_invoke('sr', 'block_view', 'our_work_list-block'));

$options = block_load('sr', 'ourwork_options');
$options = _block_get_renderable_array(_block_render_blocks(array($options)));
echo $options = drupal_render($options);

?>

<!--<h2 id="slogan">
  Cras mattis consectetur purus sit amet fermentum.<br />Maecenas faucibus mollis interdum.
</h2>-->
<div id="isotope-container">
<?php
$list = block_load('views', 'our_work_list-block');
$list = _block_get_renderable_array(_block_render_blocks(array($list)));
echo $list = drupal_render($list);
?>
</div>
<a id="loadmore" href="#">Load more</a>