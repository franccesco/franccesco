# Jekyll requirements
Jekyll is a **Ruby** gem, so before installing Jekyll you have to install Ruby, I recommend that you install Ruby with [RVM](https://rvm.io/).

## Installation
```
gem install jekyll bundler
```

## Create a site
```
jekyll new example_blog
```

## Export Ghost posts
Go to https://yoursite.com/ghost/settings/labs and download the **_Export JSON File_**, lets save it as `mybackup.json`

## Install jekyll_ghost_importer
```
gem install jekyll_ghost_importer
```

## Import posts with jekyll_ghost_importer
```
cd example_blog
jekyll_ghost_importer /path/to/mybackup.json
```

## Generate and run Jekyll
Once posts have been imported, lets generate and run Jekyll

```
jekyll generate
jekyll serve --watch --livereload
```

The flag `--watch` monitors our files and restarts the server upon changes and `--livereload` refresh the browser.

Now we should be able to see our posts:
```
Configuration file: /home/franccesco/workspace/example_blog/_config.yml
            Source: /home/franccesco/workspace/example_blog
       Destination: /home/franccesco/workspace/example_blog/_site
 Incremental build: disabled. Enable with --incremental
      Generating... 
                    done in 0.799 seconds.
 Auto-regeneration: enabled for '/home/franccesco/workspace/example_blog'
    Server address: http://127.0.0.1:4000/
LiveReload address: http://127.0.0.1:35729  Server running... press ctrl-c to stop.
```

Remember to edit `_config.yml` to edit your new blog's name and description.
