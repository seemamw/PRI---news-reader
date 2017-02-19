##Introduction:

To install `ionic-timepicker` from this fork, utilize **`bower install ionic-timepicker-dfandrade`**.

**ORIGINAL:** This is a `ionic-timepicker` bower component which can be used with any Ionic framework's application.

[View Demo](http://rajeshwarpatlolla.github.io/TimePickerForIonicFramework/demo/ "Demo") 


##Prerequisites.

1) node.js, bower and gulp.

##How to use:

1) In your project repository install the ionic time picker using bower

    bower install ionic-timepicker-dfandrade --save-dev
    
2) Then you can see the following directory structure see in your project folder
   
![Directory Structure](https://lh3.googleusercontent.com/_s2lFLFfgYSUfhdmZO0r4w6td80dEErTN4pLc7Louo8=w200-h300-p-no "Directory Structure")

Give the path of  `style.css, templates.js and ionic-timepicker.js` in your `index.html` file.

````html
<link href="lib/ionic-timepicker-dfandrade/dist/style.css" rel="stylesheet">

<!-- path to ionic/angularjs js -->
<script src="lib/ionic-timepicker-dfandrade/dist/templates.js"></script>
<script src="lib/ionic-timepicker-dfandrade/dist/ionic-timepicker.js"></script>
````    
    
3) In your application module inject the dependency `ionic-timepicker`, in order to work with the ionic time picker
    
````javascript
angular.module('modulename', ['ionic', 'ionic-timepicker']){

}
````

4) TimePicker options

```
    time:            init time               **Required
    step:            minutes step 1-59       (Default: 10)
    format:          clock format 12 or 24   (Default: 12)
    popup-title:     popup title             (Default: 12-Hour Format or 24-Hour Format)
    btn-close-text:  button close label      (Default: 'Close')
    btn-set-text:    button set label        (Default: 'Set')
    btn-close-type:  button close design     (Default: 'button-default')
    btn-set-type:    button set design       (Default: 'button-positive')
```


5) Then use the below format in your template / html file

````html
<ionic-timepicker time="currentDate" step="15" format="24" popup-title="{{'POPUP.TITLE' | translate}}" btn-close-text="{{'btn.cancel' | translate}}" btn-set-text="{{'BUTTON.SET' | translate}}" btn-set-text="{{'BUTTON.CLOSE' | translate}}" btn-close-type="button-assertive" btn-set-type="button-positive">
    <button class="button button-outline icon-left ion-android-time button-positive"> {{ currentDate | date: 'hh:mm a'}} </button>
</ionic-timepicker>
````

##Versions:

### 1) v0.1.0
The whole time picker functionality has been implemented, and can be installed with 
    
    bower install ionic-timepicker --save
    
### 2) v0.1.1
Directive name has been modified.

### 3) v0.1.2
If the minutes and hours are less than 10, then 0 will be prepended to the value of minutes/hours.

### 4) v1.0.0
* Attributes have been modified.
* Option for popup title and buttons label.
* Option for button design (color, type).
* Minutes increment/decrement improved.
* CSS: popup content centralization.

### 5) v1.0.1
Bug Fix. Time reference being changed without pressing set button.

### 6) v1.0.2
Fixing ionic version dependency.

##License:
[MIT](https://github.com/rajeshwarpatlolla/ionic-timepicker/blob/master/LICENSE.MD "MIT")

##Contact:
gmail : rajeshwar.patlolla@gmail.com

github : https://github.com/rajeshwarpatlolla

twitter : https://twitter.com/rajeshwar_9032

facebook : https://www.facebook.com/rajeshwarpatlolla

paypal : rajeshwar.patlolla@gmail.com

gmail : diones.andrade@gmail.com



