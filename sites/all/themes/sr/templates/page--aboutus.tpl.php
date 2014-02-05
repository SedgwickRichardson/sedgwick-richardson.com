<?php
/**
 * @file
 * Zen theme's implementation to display a node.
 *
 * Available variables:
 * - $title: the (sanitized) title of the node.
 * - $content: An array of node items. Use render($content) to print them all,
 *   or print a subset such as render($content['field_example']). Use
 *   hide($content['field_example']) to temporarily suppress the printing of a
 *   given element.
 * - $user_picture: The node author's picture from user-picture.tpl.php.
 * - $date: Formatted creation date. Preprocess functions can reformat it by
 *   calling format_date() with the desired parameters on the $created variable.
 * - $name: Themed username of node author output from theme_username().
 * - $node_url: Direct url of the current node.
 * - $display_submitted: Whether submission information should be displayed.
 * - $submitted: Submission information created from $name and $date during
 *   template_preprocess_node().
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. The default values can be one or more of the
 *   following:
 *   - node: The current template type, i.e., "theming hook".
 *   - node-[type]: The current node type. For example, if the node is a
 *     "Blog entry" it would result in "node-blog". Note that the machine
 *     name will often be in a short form of the human readable label.
 *   - node-teaser: Nodes in teaser form.
 *   - node-preview: Nodes in preview mode.
 *   - view-mode-[mode]: The view mode, e.g. 'full', 'teaser'...
 *   The following are controlled through the node publishing options.
 *   - node-promoted: Nodes promoted to the front page.
 *   - node-sticky: Nodes ordered above other non-sticky nodes in teaser
 *     listings.
 *   - node-unpublished: Unpublished nodes visible only to administrators.
 *   The following applies only to viewers who are registered users:
 *   - node-by-viewer: Node is authored by the user currently viewing the page.
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 *
 * Other variables:
 * - $node: Full node object. Contains data that may not be safe.
 * - $type: Node type, i.e. story, page, blog, etc.
 * - $comment_count: Number of comments attached to the node.
 * - $uid: User ID of the node author.
 * - $created: Time the node was published formatted in Unix timestamp.
 * - $pubdate: Formatted date and time for when the node was published wrapped
 *   in a HTML5 time element.
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 * - $zebra: Outputs either "even" or "odd". Useful for zebra striping in
 *   teaser listings.
 * - $id: Position of the node. Increments each time it's output.
 *
 * Node status variables:
 * - $view_mode: View mode, e.g. 'full', 'teaser'...
 * - $teaser: Flag for the teaser state (shortcut for $view_mode == 'teaser').
 * - $page: Flag for the full page state.
 * - $promote: Flag for front page promotion state.
 * - $sticky: Flags for sticky post setting.
 * - $status: Flag for published status.
 * - $comment: State of comment settings for the node.
 * - $readmore: Flags true if the teaser content of the node cannot hold the
 *   main body content. Currently broken; see http://drupal.org/node/823380
 * - $is_front: Flags true when presented in the front page.
 * - $logged_in: Flags true when the current user is a logged-in member.
 * - $is_admin: Flags true when the current user is an administrator.
 *
 * Field variables: for each field instance attached to the node a corresponding
 * variable is defined, e.g. $node->body becomes $body. When needing to access
 * a field's raw values, developers/themers are strongly encouraged to use these
 * variables. Otherwise they will have to explicitly specify the desired field
 * language, e.g. $node->body['en'], thus overriding any language negotiation
 * rule that was previously applied.
 *
 * @see template_preprocess()
 * @see template_preprocess_node()
 * @see zen_preprocess_node()
 * @see template_process()
 */
?>


<section id="ourfocus">
  <nav class="control">
    <div class="control-wrap">
      <a href="#ourfocus" class="current">Our Focus</a>
      <a href="#expertise">Expertise</a>
    </div>
  </nav>

  <div>
    <h3 class="headline">Our focus is on empowering Asian brands to become highly respected internationally, and international brands to succeed in Asia.</h3>

    <article>
      <p><span>Inspiring</span> Asian brands to become highly respected internationally, and international brands to succeed in Asia is what we pride ourselves on.</p>
      
      <p><span>Brand</span> differentiation is core to this. From Hong Kong to London, Singapore to Shanghai, clients come to us to establish and sustain relationships of worth, designing their future, communicating their story, and building belief to instill the confidence to act. </p>
      
      <p>Through corporate branding, corporate reporting and digital communications, our focus remains on one thing: <span>Performance.</span></p>
      <h4><span>Inspiring Brand Performance<sup>TM</sup></span> to build brand value.</h4>
    </article>
  </div>
</section>



<section id="expertise">
  <nav class="control">
    <div class="control-wrap">
      <a href="#ourfocus">Our Focus</a>
      <a href="#expertise" class="current">Expertise</a>
    </div>
  </nav>

  <div>
    <article>
      <h4>Branding</h4>
	  <h5>We turn complexity into opportunity.</h5>
      <p>Based on an understanding of their needs, we align stakeholders through brand content strategy and multi-disciplinary design. This is how we maintain the integrity of strategic intent right through to implementation — ensuring nothing gets lost in translation along the way.</p>
      <p>Our expertise in performance reporting means we can visualise complexity, signal meanings and craft compelling messaging for brands. With a suite of brand performance solutions that can be scaled and customised to your needs, we inspire brand performance to grow brand value.</p>
      <ul>
        <li class="accordion">
			<a href="#">Brand Strategy</a>
			<ul>
				<li><span>Research and audits</span></li>
				<li><span>Positioning</span></li>
				<li><span>Brand architecture</span></li>
				<li><span>Brand platform: mission, vision, purpose, culture, personality</span></li>
			</ul>
		</li>
        <li class="accordion">
			<a href="#">Brand Expression</a>
			<ul>
				<li><span>Content strategy</span></li>
				<li><span>Visual identity</span></li>
				<li><span>Verbal identity</span></li>
				<li><span>Naming</span></li>
			</ul>
		</li>
        <li class="accordion">
			<a href="#">Brand Application</a>
			<ul>
				<li><span>HR communications</span></li>
				<li><span>Marketing communications</span></li>
				<li><span>Environmental design</span></li>
				<li><span>Premium items</span></li>
			</ul>
		</li>
        <li class="accordion">
			<a href="#">Brand Performance Systems</a>
			<ul>
				<li><span>Brand CSR and sustainability Programmes</span></li>
				<li><span>Brand asset management systems</span></li>
				<li><span>Brand operations manuals</span></li>
				<li><span>Brand publishing systems</span></li>
				<li><span>Brand messaging systems</span></li>
				<li><span>Brand data visualisation systems</span></li>
			</ul>
		</li>
        <li class="accordion">
			<a href="#">Brand Management</a>
			<ul>
				<li><span>Brand guidelines</span></li>
				<li><span>Brand innovation and extension</span></li>
				<li><span>Internal brand alignment, engagement and training</span></li>
			</ul>
		</li>
      </ul>
    </article>

    <article>
      <h4>Reporting</h4>
	  <h5>Building the value of your brand no matter if it’s been a good or <br />“challenging” year.</h5>
      <p>We have over 20 years of experience producing annual reports internationally. Along the way we have been honoured to have worked on many firsts; the first environmental report to be produced in Hong Kong, the first online report to be GRI compliant, the inaugural CSR and sustainability reports for many leading Asian corporations. As champions of online reporting in Asia since 2000 we are advocates of reporting best practice.</p>
      <p>We help clients to articulate their vision and strategy, deliver a compelling investment message and advise on materiality issues, helping to promote a deeper understanding of financial and sustainability performance.</p>
      <ul>
        <li class="accordion">
			<a href="#">Corporate Reporting</a>
			<ul>
				<li><span>Competitor benchmarking</span></li>
				<li><span>Annual reports</span></li>
				<li><span>Sustainability reports</span></li>
				<li><span>Market documents</span></li>
				<li><span>AGM presentations</span></li>
			</ul>
		</li>
      </ul>
    </article>

    <article>
      <h4>Digital</h4>
	  <h5>Multiple platforms. One voice.</h5>
      <p>Best practice online communications makes no assumptions when it comes to defining measurable goals. That’s why we start with a deep and mutual understanding of the problem before we even begin to think about the solution – documenting the business context and competitor landscape, project goals, audience needs and messaging, technical requirements and constraints to inform the online engagement and content strategy.</p>
      <p>No matter the digital project – be it a website, intranet, infographic video – we sketch, iterate, learn, and iterate again – continuously checking our content and beautiful interface designs are more than skin deep against the agreed-upon business and user goals. Regular client communication to cultivate honest critique ensures the end result is an authentic, compelling and consistent brand voice across <br />multiple platforms.</p>
      <ul>
        <li class="accordion">
          <a href="#">Online Strategy</a>
          <ul>
            <li><span>Competitor benchmarking</span></li>
            <li><span>Social media strategy and monitoring</span></li>
          </ul>
        </li>
        <li class="accordion">
			<a href="#">Online Application</a>
			<ul>
            <li><span>User experience and interface design</span></li>
            <li><span>Website and intranet design and development</span></li>
            <li><span>Online corporate reporting</span></li>
          </ul>
		 </li>
        <li class="accordion">
			<a href="#">Online Management</a>
			<ul>
				<li><span>Digital asset management</span></li>
				<li><span>Analytics</span></li>
				<li><span>CMS consultancy and training</span></li>
          </ul>
		</li>
      </ul>
    </article>
  </div>
</section>
