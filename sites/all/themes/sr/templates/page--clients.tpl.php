<?php
//echo $block = drupal_render(module_invoke('sr', 'block_view', 'our_work_list-block'));

$options = block_load('sr', 'clients_options');
$options = _block_get_renderable_array(_block_render_blocks(array($options)));
echo $options = drupal_render($options);
?>



<div id="isotope-container">
<?php
$list = block_load('views', 'clientslist-block');
$list = _block_get_renderable_array(_block_render_blocks(array($list)));
echo $list = drupal_render($list);
?>
</div>
<a id="loadmore" href="#">Load more</a>