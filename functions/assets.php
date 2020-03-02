<?php

/**
 * Return the path for a compiled asset
 */
function do_get_assets($asset)
{
  return get_template_directory_uri() . '/dist/' . do_get_assets_version($asset);
}

/**
 * Get the current asset version from assets-manifest.json
 */
function do_get_assets_version($asset)
{
  $asset_file = file_get_contents(get_template_directory() . '/dist/assets-manifest.json');
  $asset_json = json_decode($asset_file);

  return $asset_json->{$asset};
}
