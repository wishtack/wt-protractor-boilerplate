# wt-protractor-boilerplate

This is a boilerplate to demonstrate the combined and powerful usage of gulp, protractor and browserstack to run
cross-browser e2e (end-to-end) tests with AngularJS web apps or any other website.

Just clone and run it!

```shell
 # Clone it.
 git clone https://github.com/wishtack/wt-protractor-boilerplate.git
 cd wt-protractor-boilerplate
 
 # Install dependencies.
 npm install
 
 # Install gulp command.
 sudo npm install -g gulp
 
 # Run google search demonstration test.
 export BROWSERSTACK_USER=your_browserstack_user_id
 export BROWSERSTACK_KEY=your_browserstack_key
 
 gulp test-e2e
```

Then you can write your own tests in 'test/e2e/' directory and choose the browsers you want to test in 'gulp/config-protractor.js'.
