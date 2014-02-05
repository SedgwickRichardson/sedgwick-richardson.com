<?php
/**
 * @file views-isotope.tpl.php
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>
<div id="isotope-container">
  <?php
    $count = 0;
//    dsm( $isotope_filter_classes);
    foreach ($rows as $row):
  ?>
    <div class="isotope-element <?php print $isotope_filter_classes[$count]; ?>" data-category="<?php print $isotope_filter_classes[$count]; ?>">
      <?php print $row; ?>
    </div>
  <?php
      $count++;
    endforeach;
  ?>
</div>