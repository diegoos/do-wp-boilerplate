<?php

####################################################################################
# Include funtions
####################################################################################
function do_load_functions($path) {
  $files = glob("$path/*");

  foreach ($files as $function) {
      if (is_dir($function)) {
          do_load_functions("$function/*");
      } elseif (preg_match('/\.php$/', $function)) {
          include $function;
      }
  }
}

do_load_functions(get_template_directory().'/functions');
