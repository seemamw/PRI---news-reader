//By Rajeshwar Patlolla
//https://github.com/rajeshwarpatlolla

angular.module('ionic-timepicker', ['ionic', 'ionic-timepicker.templates'])

// Defining `ionicTimepicker` directive
.directive('ionicTimepicker', ['$ionicPopup', '$filter', function($ionicPopup, $filter) {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            time: '=',
            step: '@',
            format: '@',
            popupTitle: '@',
            btnCloseText: '@',
            btnSetText: '@',
            btnCloseType: '@',
            btnSetType: '@'
        },

        link: function(scope, element, attrs) {

            element.on("click", function() {

                scope.timePicker = {
                    time: new Date(scope.time.getTime()),
                    step: angular.isDefined(scope.step) && scope.step > 0 && scope.step < 60 ? Number(scope.step) : 10,
                    format: angular.isDefined(scope.format) && scope.format == 24 ? 24 : 12,
                    popupTitle: '',
                    btnCloseText: angular.isDefined(scope.btnCloseText) ? scope.btnCloseText : 'Close',
                    btnSetText: angular.isDefined(scope.btnSetText) ? scope.btnSetText : 'Set',
                    btnCloseType: angular.isDefined(scope.btnCloseType) ? scope.btnCloseType : 'button-default',
                    btnSetType: angular.isDefined(scope.btnSetType) ? scope.btnSetType : 'button-positive'
                }

                if (angular.isDefined(scope.popupTitle)) {
                    scope.timePicker.popupTitle = scope.popupTitle;
                } else {
                    scope.timePicker.popupTitle = scope.timePicker.format == 12 ? '12-Hour Format' : '24-Hour Format';
                }

                function updateSlots() {
                    scope.slot = {
                        hours: $filter('date')(scope.timePicker.time, scope.timePicker.format == 12 ? 'hh' : 'HH'),
                        minutes: $filter('date')(scope.timePicker.time, 'mm'),
                        meridian: $filter('date')(scope.timePicker.time, 'a')
                    }
                }

                updateSlots();

                scope.increaseHours = function() {
                    scope.timePicker.time.setHours(scope.timePicker.time.getHours() + 1);
                    updateSlots();
                };

                scope.decreaseHours = function() {
                    scope.timePicker.time.setHours(scope.timePicker.time.getHours() - 1);
                    updateSlots();
                };

                scope.increaseMinutes = function() {
                    var minutes = scope.timePicker.time.getMinutes();
                    if (minutes % scope.timePicker.step != 0) {
                        minutes -= minutes % scope.timePicker.step;
                    }
                    scope.timePicker.time.setMinutes(minutes + scope.timePicker.step);
                    updateSlots();
                };

                scope.decreaseMinutes = function() {
                    var minutes = scope.timePicker.time.getMinutes();
                    if (minutes % scope.timePicker.step != 0) {
                        minutes -= minutes % scope.timePicker.step;
                    } else {
                        minutes -= scope.timePicker.step;
                    }
                    scope.timePicker.time.setMinutes(minutes);
                    updateSlots();
                };

                if (scope.timePicker.format == 12) {
                    scope.changeMeridian = function() {
                        scope.timePicker.time.setHours(scope.timePicker.time.getHours() + 12);
                        updateSlots();
                    };
                }

                $ionicPopup.show({
                    templateUrl: 'time-picker.html',
                    title: '<strong>' + scope.timePicker.popupTitle + '</strong>',
                    subTitle: '',
                    scope: scope,
                    buttons: [{
                        text: scope.timePicker.btnCloseText,
                        type: scope.timePicker.btnCloseType
                    }, {
                        text: scope.timePicker.btnSetText,
                        type: scope.timePicker.btnSetType,
                        onTap: function(e) {
                            scope.time.setHours(scope.timePicker.time.getHours());
                            scope.time.setMinutes(scope.timePicker.time.getMinutes());
                        }
                    }]
                })
            });
        }
    };
}]);
