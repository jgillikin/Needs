webpackJsonp([0],{

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApproveuserPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__notifications_notifications__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__approveuseredit_approveuseredit__ = __webpack_require__(297);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ApproveuserPage = (function () {
    function ApproveuserPage(navCtrl, platform, afA, db, modalCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.afA = afA;
        this.db = db;
        this.modalCtrl = modalCtrl;
        this.newuser = {};
        this.platformList = '';
        this.isApp = true;
        this.isAdmin = false;
        this.userId = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"]().currentUser.uid;
        var platforms = this.platform.platforms();
        this.platformList = platforms.join(', ');
        if (this.platform.is('core') || this.platform.is('mobileweb')) {
            this.isApp = false;
        }
        this.descRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref('/users-pending');
        this.descRef.on('value', function (descList) {
            var descs = [];
            descList.forEach(function (desc) {
                //    descs.push(desc.val());
                var weeklyData = {};
                weeklyData["id"] = desc.key;
                weeklyData["record"] = desc.val();
                //descs.push(desc.val()+" "+desc.key);
                descs.push(weeklyData);
                return false;
            });
            //alert(descs[0].id);
            _this.descList = descs;
        });
        /*this.size$ = new BehaviorSubject(null);
        
        this.items$ = this.size$.switchMap(size =>
             db.list('/needs', ref =>
               status ? ref.orderByChild('dateSub').equalTo('NEW') : ref
             ).snapshotChanges()
           );*/
        this.descRef2 = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref('/users-list');
        this.descRef2.on('value', function (descList) {
            var temp = false;
            var descs5 = [];
            descList.forEach(function (desc) {
                var weeklyData = {};
                weeklyData["id"] = desc.key;
                weeklyData["record"] = desc.val();
                //alert("this userId is "+this.userId+" and array uid is "+weeklyData["record"].uid);
                if (weeklyData["record"].uid == _this.userId) {
                    descs5.push(weeklyData);
                    if (weeklyData["record"].type == 'A')
                        temp = true;
                    else
                        temp = false;
                }
                return false;
            });
            //  this.descList = descs5;
            _this.isAdmin = temp;
        });
        this.needRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref('/needs');
        this.needRef.on('value', function (descList) {
            var descs2 = [];
            descList.forEach(function (desc) {
                //    descs.push(desc.val());
                var weeklyData = {};
                weeklyData["id"] = desc.key;
                weeklyData["record"] = desc.val();
                //descs.push(desc.val()+" "+desc.key);
                if (_this.isAdmin) {
                    if (weeklyData["record"].status == 'Requested' && weeklyData["record"].advocate === _this.userId) {
                        // alert(weeklyData["record"].desc);
                        descs2.push(weeklyData);
                    }
                    if (weeklyData["record"].status == 'InProgress' && weeklyData["record"].reqBy === _this.userId) {
                        //    alert(weeklyData["record"].desc);
                        descs2.push(weeklyData);
                    }
                    if (weeklyData["record"].status == 'WorkCompleted' && weeklyData["record"].advocate === _this.userId) {
                        //   alert(weeklyData["record"].desc);
                        descs2.push(weeklyData);
                    }
                }
                else {
                    if (weeklyData["record"].status == 'InProgress' && weeklyData["record"].reqBy === _this.userId)
                        descs2.push(weeklyData);
                }
                return false;
            });
            //alert(descs[0].id);
            _this.needList = descs2;
            //this.loadedDescList = descs;
        });
        //alert("needList size is "+this.needList.length);
        if (this.needList === undefined)
            this.needList = [];
    } //end constructor
    ApproveuserPage.prototype.ionViewDidLoad = function () {
        this.userId = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"]().currentUser.uid;
    };
    ApproveuserPage.prototype.goNot = function () {
        //alert("in goNot");
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__notifications_notifications__["a" /* NotificationsPage */]);
    };
    ApproveuserPage.prototype.open1 = function (fname, lname, cell, defCom, key, email, password) {
        //alert("pass email "+email+ "and password"+password);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__approveuseredit_approveuseredit__["a" /* ApproveusereditPage */], {
            firstPassed: fname,
            secondPassed: lname,
            thirdPassed: cell,
            fourthPassed: defCom,
            fifthPassed: key,
            sixthPassed: email,
            seventhPassed: password
        });
    };
    ApproveuserPage.prototype.openModal = function () {
        var myModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__notifications_notifications__["a" /* NotificationsPage */]);
        myModal.present();
    };
    ApproveuserPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-approveuser',template:/*ion-inline-start:"C:\needsApp\src\pages\approveuser\approveuser.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Approve User</ion-title>\n\n\n\n    <ion-buttons end>\n\n        <button id="notification-button" ion-button clear (click)="openModal()">\n\n            <ion-icon name="notifications">\n\n              <ion-badge id="notifications-badge" color="danger">{{this.needList.length}}</ion-badge>\n\n            </ion-icon>\n\n        </button>\n\n      </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n\n\n<div *ngFor="let desc of descList" text-center>\n\n<ion-item (click)="open1(desc.record.fname,desc.record.lname,desc.record.cell,desc.record.defaultCom,desc.id,desc.record.email,desc.record.password)"><b>Requested user:</b>  {{desc.record.fname}} {{desc.record.lname}} <br>\n\n<b>Date Requested:</b>  {{desc.record.dateAdded}}</ion-item>\n\n\n\n</div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\needsApp\src\pages\approveuser\approveuser.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
    ], ApproveuserPage);
    return ApproveuserPage;
}());

//# sourceMappingURL=approveuser.js.map

/***/ }),

/***/ 154:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 154;

/***/ }),

/***/ 197:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 197;

/***/ }),

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__notifications_notifications__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_toast__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var HomePage = (function () {
    function HomePage(navCtrl, platform, db, toast, modalCtrl, toastCtrl, http) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.db = db;
        this.toast = toast;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.platformList = '';
        this.isApp = true;
        this.need = {};
        this.nd = this.db.list('/needs');
        this.isAdmin = false;
        this.http = http;
        this.userId = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"]().currentUser.uid;
        var platforms = this.platform.platforms();
        this.platformList = platforms.join(', ');
        if (this.platform.is('core') || this.platform.is('mobileweb')) {
            this.isApp = false;
        }
        this.descRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref('/clients');
        this.descRef.on('value', function (descList) {
            var descs = [];
            descList.forEach(function (desc) {
                //    descs.push(desc.val());
                var weeklyData = {};
                weeklyData["id"] = desc.key;
                weeklyData["name"] = desc.val().fname + ' ' + desc.val().lname;
                weeklyData["record"] = desc.val();
                //descs.push(desc.val()+" "+desc.key);
                descs.push(weeklyData);
                return false;
            });
            //alert(descs[0].id);
            _this.descList = descs;
            //this.loadedDescList = descs;
        });
        this.descRef2 = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref('/users-list');
        this.descRef2.on('value', function (descList) {
            var temp = false;
            var f, l;
            var descs5 = [];
            var hviews = [];
            descList.forEach(function (desc) {
                var weeklyData = {};
                weeklyData["id"] = desc.key;
                weeklyData["record"] = desc.val();
                //alert("this userId is "+this.userId+" and array uid is "+weeklyData["record"].uid);
                if (weeklyData["record"].uid == _this.userId) {
                    descs5.push(weeklyData);
                    f = weeklyData["record"].fname;
                    l = weeklyData["record"].lname;
                    if (weeklyData["record"].type == 'A')
                        temp = true;
                    else
                        temp = false;
                }
                if (weeklyData["record"].defaultCom === 'Harbour View') {
                    hviews.push(weeklyData);
                }
                return false;
            });
            //  this.descList = descs5;
            _this.hviewList = hviews;
            _this.isAdmin = temp;
            _this.fname = f;
            _this.lname = l;
        });
        this.needRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref('/needs');
        this.needRef.on('value', function (descList) {
            var descs2 = [];
            descList.forEach(function (desc) {
                //    descs.push(desc.val());
                var weeklyData = {};
                weeklyData["id"] = desc.key;
                weeklyData["record"] = desc.val();
                //descs.push(desc.val()+" "+desc.key);
                if (_this.isAdmin) {
                    if (weeklyData["record"].status == 'Requested' && weeklyData["record"].advocate === _this.userId) {
                        // alert(weeklyData["record"].desc);
                        descs2.push(weeklyData);
                    }
                    if (weeklyData["record"].status == 'InProgress' && weeklyData["record"].reqBy === _this.userId) {
                        //    alert(weeklyData["record"].desc);
                        descs2.push(weeklyData);
                    }
                    if (weeklyData["record"].status == 'WorkCompleted' && weeklyData["record"].advocate === _this.userId) {
                        //   alert(weeklyData["record"].desc);
                        descs2.push(weeklyData);
                    }
                }
                else {
                    if (weeklyData["record"].status == 'InProgress' && weeklyData["record"].reqBy === _this.userId)
                        descs2.push(weeklyData);
                }
                return false;
            });
            //alert(descs[0].id);
            _this.needList = descs2;
            //this.loadedDescList = descs;
        });
        //alert("needList size is "+this.needList.length);
        if (this.needList === undefined)
            this.needList = [];
        /* this.size$ = new BehaviorSubject(null);
        
         this.items$ = this.size$.switchMap(count =>
              db.list('/needs', ref =>
                count ? ref.orderByChild('count').equalTo('1') : ref
              ).valueChanges()
            );
        */
        this.userRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref('/users-list');
        this.userRef.on('value', function (descList) {
            var descs4 = '';
            var descs5 = '';
            descList.forEach(function (desc) {
                var weeklyData = {};
                weeklyData["id"] = desc.key;
                weeklyData["record"] = desc.val();
                if (weeklyData["record"].uid == _this.userId) {
                    descs4 = weeklyData["record"].fname + ' ' + weeklyData["record"].lname;
                    descs5 = weeklyData["record"].cell;
                }
                return false;
            });
            // this.reqName = descs4;
            _this.reqCell = descs5;
        });
    } //end constructor
    HomePage_1 = HomePage;
    HomePage.prototype.ionViewDidLoad = function () {
        this.userId = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"]().currentUser.uid;
    };
    HomePage.prototype.onSave = function (nd2, commId) {
        //alert("in onSave and commId is "+commId);
        //alert("in onSave and fname is "+cl2.fname+" and lname is "+cl2.lname+" and cell is "+cl2.cell+" and community is "+cl2.community);
        if (!commId || !nd2.clientId || !nd2.desc) {
            if (this.platform.is('tablet') || this.platform.is('ipad')) {
                this.toast.show("Please fill in all fields", '3000', 'center').subscribe(function (toast) {
                    console.log(toast);
                });
                return false;
            }
            else if (this.platform.is('mobileweb')) {
                var toast = this.toastCtrl.create({
                    message: 'Please fill in all fields',
                    duration: 2000,
                    position: 'bottom'
                });
                toast.present();
            }
            else {
                alert('Please fill in all fields');
                return false;
            }
        }
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        today = mm + '/' + dd + '/' + yyyy;
        this.nd.push({
            "clientId": nd2.clientId,
            "desc": nd2.desc,
            "dateSub": today,
            "status": 'NEW',
            "advocate": this.userId,
            "advocateName": this.fname + ' ' + this.lname,
            "advocateCell": this.reqCell,
            "dateComp": '',
            "notes": '',
            "communityId": commId
        });
        if (this.platform.is('mobileweb')) {
            var toast2 = this.toastCtrl.create({
                message: 'Need Saved',
                duration: 2000,
                position: 'bottom'
            });
            toast2.present();
        }
        //send text for new Need
        var link2 = 'https://twiliotest-ajvlzxkjds.now.sh/login';
        var mmsg = 'There is a new Need in the Needs App:  ' + nd2.desc;
        // this.hviewList
        for (var s = 0; s < this.hviewList.length; s++) {
            // alert(this.hviewList[s].record.cell);
            //if (this.hviewList[s].record.cell == '7572865248') {
            var params = new __WEBPACK_IMPORTED_MODULE_6__angular_http__["c" /* URLSearchParams */]();
            params.set('msg', mmsg);
            params.set('mto', '["1' + this.hviewList[s].record.cell + '"]');
            //Http request-
            this.http.get(link2, {
                search: params
            }).subscribe(function (response) { return console.log('worked'); }, function (error) { return console.log('error'); });
            //} //end temp if
        } //end for
        this.navCtrl.setRoot(HomePage_1);
    };
    HomePage.prototype.goNot = function () {
        //alert("in goNot");
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__notifications_notifications__["a" /* NotificationsPage */]);
    };
    HomePage.prototype.onChange = function (clientId) {
        //this.shoppingList2 = firebase.database().ref('/clients/'+clientId);
        var _this = this;
        this.descRef.on('value', function (descList) {
            var descs = [];
            descList.forEach(function (desc) {
                //    descs.push(desc.val());
                var weeklyData = {};
                weeklyData["id"] = desc.key;
                weeklyData["record"] = desc.val();
                //descs.push(desc.val()+" "+desc.key);
                descs.push(weeklyData);
                return false;
            });
            //alert(descs[0].id);
            //alert(descs[0].record.community);
            _this.communityId = descs[0].record.community;
            //this.descList = descs;
            _this.loadedDescList = descs;
        });
    };
    HomePage.prototype.openModal = function () {
        var myModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__notifications_notifications__["a" /* NotificationsPage */]);
        myModal.present();
    };
    HomePage = HomePage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\needsApp\src\pages\home\home.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Needs</ion-title>\n\n<ion-buttons end>\n\n    <button id="notification-button" ion-button clear (click)="openModal()">\n\n        <ion-icon name="notifications">\n\n          <ion-badge id="notifications-badge" color="danger">{{this.needList.length}}\n\n</ion-badge>\n\n        </ion-icon>\n\n    </button>\n\n  </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n\n\n<div *ngIf="!isApp" text-center>\n\n\n\n<table width="95%">\n\n<ion-list>\n\n\n\n\n\n <ion-item>\n\n                  <ion-label>Client</ion-label>\n\n                  <ion-select [(ngModel)]="need.clientId" (ionChange)="onChange(need.clientId)">\n\n                    <div *ngFor="let field of descList">\n\n                      <ion-option value="{{field.name}}">{{field.record.fname}} {{field.record.lname}}\n\n                      </ion-option>\n\n                    </div>\n\n                  </ion-select>\n\n </ion-item>\n\n\n\n\n\n  <ion-item>\n\n    <ion-label color="dark">Need:  </ion-label>\n\n    <ion-input [(ngModel)]="need.desc"></ion-input>\n\n  </ion-item>\n\n\n\n  <ion-item>\n\n  <ion-input type="hidden" [(ngModel)]="communityId"></ion-input>\n\n  </ion-item>\n\n\n\n</ion-list>\n\n</table>\n\n\n\n</div>\n\n\n\n<div *ngIf="isApp" text-center>\n\n\n\n<ion-list>\n\n\n\n\n\n\n\n   <ion-item>\n\n                    <ion-label>Client</ion-label>\n\n                    <ion-select [(ngModel)]="need.clientId" (ionChange)="onChange(need.clientId)">\n\n                      <div *ngFor="let field of descList">\n\n                        <ion-option value="{{field.name}}">{{field.record.fname}} {{field.record.lname}}\n\n                        </ion-option>\n\n                      </div>\n\n                    </ion-select>\n\n   </ion-item>\n\n\n\n\n\n    <ion-item>\n\n      <ion-label color="dark">Need Description:  </ion-label>\n\n      <ion-input [(ngModel)]="need.desc"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n    <ion-input type="hidden" [(ngModel)]="communityId"></ion-input>\n\n    </ion-item>\n\n\n\n</ion-list>\n\n\n\n</div>\n\n\n\n<br>\n\n<div text-center>\n\n<button ion-button color="dark" (click) ="onSave(need,communityId)">Save</button>\n\n</div>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\needsApp\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_toast__["a" /* Toast */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_6__angular_http__["a" /* Http */]])
    ], HomePage);
    return HomePage;
    var HomePage_1;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetpwdPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



//import { AuthService } from '../../providers/auth-service';


/*
  Generated class for the Resetpwd page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ResetpwdPage = (function () {
    function ResetpwdPage(navCtrl, authService, navParams, formBuilder, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.emailChanged = false;
        this.submitAttempt = false;
        var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        this.resetpwdForm = formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern(EMAIL_REGEXP)])]
        });
    }
    ResetpwdPage.prototype.elementChanged = function (input) {
        var field = input.inputControl.name;
        this[field + "Changed"] = true;
    };
    ResetpwdPage.prototype.resetPwd = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.authService.auth.sendPasswordResetEmail(this.email)];
                    case 1:
                        result = _a.sent();
                        //      if (result) {
                        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ResetpwdPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-resetpwd',template:/*ion-inline-start:"C:\needsApp\src\pages\resetpwd\resetpwd.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Reset Password</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <h2>Reset Password</h2>\n\n  <form [formGroup]="resetpwdForm" (submit)="resetPwd(email)" novalidate>\n\n    <ion-item>\n\n      <ion-label stacked>Email</ion-label>\n\n      <ion-input type="email" [(ngModel)]="email" formControlName="email" name="email" type="email" \n\n        placeholder="Your email address"\n\n        [class.invalid]="!resetpwdForm.controls.email.valid && (emailChanged || submitAttempt)"></ion-input>\n\n    </ion-item>\n\n    <ion-item class="error-message" *ngIf="!resetpwdForm.controls.email.valid  && (emailChanged || submitAttempt)">\n\n      <p>Please enter a valid email.</p>\n\n    </ion-item>\n\n    <button ion-button block type="submit">\n\n      Reset Password\n\n    </button>\n\n  </form>\n\n</ion-content>'/*ion-inline-end:"C:\needsApp\src\pages\resetpwd\resetpwd.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], ResetpwdPage);
    return ResetpwdPage;
}());

//# sourceMappingURL=resetpwd.js.map

/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_toast__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var RegisterPage = (function () {
    function RegisterPage(navCtrl, platform, db, http, toast, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.db = db;
        this.toast = toast;
        this.toastCtrl = toastCtrl;
        this.platformList = '';
        this.isApp = true;
        this.newuser = {};
        this.nu = this.db.list('/users-pending');
        this.data = {};
        var platforms = this.platform.platforms();
        this.http = http;
        this.platformList = platforms.join(', ');
        if (this.platform.is('core') || this.platform.is('mobileweb')) {
            this.isApp = false;
        }
        this.descRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref('/communities');
        this.descRef.on('value', function (descList) {
            var descs = [];
            descList.forEach(function (desc) {
                //    descs.push(desc.val());
                var weeklyData = {};
                weeklyData["id"] = desc.key;
                weeklyData["record"] = desc.val();
                //descs.push(desc.val()+" "+desc.key);
                descs.push(weeklyData);
                return false;
            });
            //alert(descs[0].id);
            _this.descList = descs;
            // this.loadedDescList = descs;
        });
    } //end constructor
    RegisterPage.prototype.onSave = function (nu2) {
        //alert("in onSave and fname is "+nu2.fname+" and lname is "+nu2.lname+" and cell is "+nu2.cell+" and community is "+nu2.defaultCom);
        if (!nu2.cell || nu2.cell.length < 10) {
            if (this.platform.is('tablet') || this.platform.is('ipad')) {
                this.toast.show("Please enter 10 digit number", '3000', 'center').subscribe(function (toast) {
                    console.log(toast);
                });
                return false;
            }
            else if (this.platform.is('mobileweb')) {
                var toast = this.toastCtrl.create({
                    message: 'Please enter 10 digit number',
                    duration: 2000,
                    position: 'bottom'
                });
                toast.present();
            }
            else {
                alert('Please enter 10 digit number');
                return false;
            }
        }
        if (!nu2.fname || !nu2.lname || !nu2.email || !nu2.password || !nu2.defaultCom) {
            if (this.platform.is('android') || this.platform.is('tablet') || this.platform.is('ipad')) {
                this.toast.show("Please fill in all fields", '3000', 'center').subscribe(function (toast) {
                    console.log(toast);
                });
                return false;
            }
            else if (this.platform.is('mobileweb')) {
                var toast = this.toastCtrl.create({
                    message: 'Please fill in all fields',
                    duration: 2000,
                    position: 'top'
                });
                toast.present();
            }
            else {
                alert('Please fill in all fields');
                return false;
            }
        }
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        today = mm + '/' + dd + '/' + yyyy;
        //let cellMod = nu2.cell.replace(/-/g,"");
        var cellMod = nu2.cell.replace(/[()\-\s]+/g, '');
        this.nu.push({
            "fname": nu2.fname,
            "lname": nu2.lname,
            "email": nu2.email,
            "cell": cellMod,
            "defaultCom": nu2.defaultCom,
            "password": nu2.password,
            "dateAdded": today
        });
        var sendEmail = '7572865248@messaging.sprintpcs.com';
        //send SMS
        var link = 'https://jasongillikin.000webhostapp.com/blueEmail.php';
        var mmsg = 'New Needs User request from ' + nu2.fname + ' ' + nu2.lname;
        //alert("mmsg is "+mmsg);
        //var link2='https://till-node-demo-iizbwqdopi.now.sh/login';
        var link2 = 'https://twiliotest-ajvlzxkjds.now.sh/login';
        //linked to palomas gmail in Till
        //alert(link2);
        //twilio on Zeit with palomas email
        var link3 = 'http://needstwilio-twilioneeds.a3c1.starter-us-west-1.openshiftapps.com:3000/login';
        var myData, myData2;
        var message;
        myData = JSON.stringify({ emailS: 'New Needs User request:  ' + nu2.fname + ' ' + nu2.lname });
        myData2 = JSON.stringify({ msg: 'New Needs User request:  ' + nu2.fname + ' ' + nu2.lname });
        var params = new __WEBPACK_IMPORTED_MODULE_5__angular_http__["c" /* URLSearchParams */]();
        params.set('msg', mmsg);
        params.set('mto', '["17572865248"]');
        //Http request-
        this.http.get(link2, {
            search: params
        }).subscribe(function (response) { return console.log('worked'); }, function (error) { return console.log('error'); });
        /*
        this.http.post(link2,myData2)
        .subscribe(data => {
        this.data.response = "OK";
        }, error => {
        console.log("oops");
        });
        */
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"C:\needsApp\src\pages\register\register.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      Register\n\n    </ion-title>\n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n<div text-center>\n\n<u>Please register below and you will receive a text message when your account is activated.</u>\n\n</div>\n\n<br>\n\n<div *ngIf="!isApp" text-center>\n\n\n\n<table width="75%" align="center">\n\n<ion-list>\n\n  <ion-item>\n\n    <ion-label color="dark">First Name:  </ion-label>\n\n    <ion-input [(ngModel)]="newuser.fname"></ion-input>\n\n  </ion-item>\n\n    <ion-item>\n\n    <ion-label color="dark">Last Name:  </ion-label>\n\n    <ion-input [(ngModel)]="newuser.lname"></ion-input>\n\n  </ion-item>\n\n\n\n    <ion-item>\n\n    <ion-label color="dark">Cell:  </ion-label>\n\n    <ion-input type="tel" [(ngModel)]="newuser.cell"></ion-input>\n\n  </ion-item>\n\n\n\n    <ion-item>\n\n    <ion-label color="dark">E-mail:  </ion-label>\n\n    <ion-input type="email" [(ngModel)]="newuser.email"></ion-input>\n\n  </ion-item> \n\n\n\n<ion-item> \n\n    <ion-label color="dark">Password:  </ion-label>\n\n    <ion-input type="password" [(ngModel)]="newuser.password"></ion-input>\n\n  </ion-item>\n\n\n\n\n\n <ion-item>\n\n                  <ion-label>Community</ion-label>\n\n                  <ion-select [(ngModel)]="newuser.defaultCom">\n\n                    <div *ngFor="let field of descList">\n\n                      <ion-option value="{{field.record.name}}">{{field.record.name}}\n\n                      </ion-option>\n\n                    </div>\n\n                  </ion-select>\n\n </ion-item>\n\n\n\n\n\n</ion-list>\n\n</table>\n\n\n\n</div>\n\n\n\n<div *ngIf="isApp" text-center>\n\n\n\n<br>\n\n\n\n<ion-list>\n\n  <ion-item>\n\n    <ion-label color="dark">First Name:  </ion-label>\n\n    <ion-input [(ngModel)]="newuser.fname"></ion-input>\n\n  </ion-item>\n\n    <ion-item>\n\n    <ion-label color="dark">Last Name:  </ion-label>\n\n    <ion-input [(ngModel)]="newuser.lname"></ion-input>\n\n  </ion-item>\n\n\n\n    <ion-item>\n\n    <ion-label color="dark">Cell:  </ion-label>\n\n    <ion-input type="tel" [(ngModel)]="newuser.cell"></ion-input>\n\n  </ion-item>\n\n\n\n    <ion-item>\n\n    <ion-label color="dark">E-mail:  </ion-label>\n\n    <ion-input type="email" [(ngModel)]="newuser.email"></ion-input>\n\n  </ion-item>\n\n\n\n<ion-item> \n\n    <ion-label color="dark">Password:  </ion-label>\n\n    <ion-input type="password" [(ngModel)]="newuser.password"></ion-input>\n\n  </ion-item>\n\n\n\n\n\n <ion-item>\n\n                  <ion-label color="dark">Community</ion-label>\n\n                  <ion-select [(ngModel)]="newuser.defaultCom">\n\n                    <div *ngFor="let field of descList">\n\n                      <ion-option value="{{field.record.name}}">{{field.record.name}}\n\n                      </ion-option>\n\n                    </div>\n\n                  </ion-select>\n\n </ion-item>\n\n\n\n\n\n</ion-list>\n\n</div>\n\n\n\n<br>\n\n<div text-center>\n\n<button ion-button color="dark" (click) ="onSave(newuser)">Save</button>\n\n</div>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\needsApp\src\pages\register\register.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_toast__["a" /* Toast */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__about_about__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__contact_contact__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__approveuser_approveuser__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__more_more__ = __webpack_require__(298);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var TabsPage = (function () {
    function TabsPage(navCtrl, platform, db) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.db = db;
        this.platformList = '';
        this.isApp = true;
        this.isAdmin = false;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_4__about_about__["a" /* AboutPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_5__contact_contact__["a" /* ContactPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_7__approveuser_approveuser__["a" /* ApproveuserPage */];
        this.tab5Root = __WEBPACK_IMPORTED_MODULE_8__more_more__["a" /* MorePage */];
        this.userId = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"]().currentUser.uid;
        this.descRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref('/users-list');
        this.descRef.on('value', function (descList) {
            var temp = false;
            var descs5 = [];
            descList.forEach(function (desc) {
                var weeklyData = {};
                weeklyData["id"] = desc.key;
                weeklyData["record"] = desc.val();
                //alert("this userId is "+this.userId+" and array uid is "+weeklyData["record"].uid);
                if (weeklyData["record"].uid == _this.userId) {
                    descs5.push(weeklyData);
                    if (weeklyData["record"].type == 'A')
                        temp = true;
                    else
                        temp = false;
                }
                return false;
            });
            _this.descList = descs5;
            _this.isAdmin = temp;
        });
        this.pendRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref('/users-pending');
        this.pendRef.on('value', function (descList) {
            var descs9 = [];
            descList.forEach(function (desc) {
                var weeklyData = {};
                weeklyData["id"] = desc.key;
                weeklyData["record"] = desc.val();
                descs9.push(weeklyData);
                return false;
            });
            _this.pendList = descs9;
        });
        if (this.pendList === undefined)
            this.pendList = [];
    } //end constructor
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\needsApp\src\pages\tabs\tabs.html"*/'<ion-tabs>\n\n  <ion-tab [show]="isAdmin" [root]="tab1Root" tabTitle="Add Need" tabIcon="heart"></ion-tab>\n\n  <ion-tab [show]="isAdmin" [root]="tab2Root" tabTitle="Add Client" tabIcon="contacts"></ion-tab>\n\n  <ion-tab [root]="tab3Root" tabTitle="Search" tabIcon="search"></ion-tab>\n\n  <ion-tab [show]="isAdmin" tabBadgeStyle="danger" tabBadge={{pendList.length}} [root]="tab4Root" tabTitle="Approve User" tabIcon="hand">\n\n</ion-tab>\n\n  <ion-tab [root]="tab5Root" tabTitle="More" tabIcon="settings"></ion-tab>\n\n</ion-tabs>\n\n'/*ion-inline-end:"C:\needsApp\src\pages\tabs\tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__notifications_notifications__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_toast__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var AboutPage = (function () {
    function AboutPage(navCtrl, platform, db, toast, modalCtrl, toastCtrl, app) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.db = db;
        this.toast = toast;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.app = app;
        this.platformList = '';
        this.isApp = true;
        this.client = {};
        this.isAdmin = false;
        this.clt = this.db.list('/clients');
        this.userId = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"]().currentUser.uid;
        var platforms = this.platform.platforms();
        this.platformList = platforms.join(', ');
        if (this.platform.is('core') || this.platform.is('mobileweb')) {
            this.isApp = false;
            /* this.size$ = new BehaviorSubject(null);
     
            this.items$ = this.size$.switchMap(size =>
                  db.list('/needs', ref =>
                    status ? ref.orderByChild('dateSub').equalTo('NEW') : ref
                  ).snapshotChanges()
                ); */
        }
        this.descRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref('/communities');
        this.descRef.on('value', function (descList) {
            var descs = [];
            descList.forEach(function (desc) {
                //    descs.push(desc.val());
                var weeklyData = {};
                weeklyData["id"] = desc.key;
                weeklyData["record"] = desc.val();
                //descs.push(desc.val()+" "+desc.key);
                descs.push(weeklyData);
                return false;
            });
            //alert(descs[0].id);
            _this.descList = descs;
            //this.loadedDescList = descs;
        });
        this.descRef2 = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref('/users-list');
        this.descRef2.on('value', function (descList) {
            var temp = false;
            var descs5 = [];
            descList.forEach(function (desc) {
                var weeklyData = {};
                weeklyData["id"] = desc.key;
                weeklyData["record"] = desc.val();
                //alert("this userId is "+this.userId+" and array uid is "+weeklyData["record"].uid);
                if (weeklyData["record"].uid == _this.userId) {
                    descs5.push(weeklyData);
                    if (weeklyData["record"].type == 'A')
                        temp = true;
                    else
                        temp = false;
                }
                return false;
            });
            //  this.descList = descs5;
            _this.isAdmin = temp;
        });
        this.needRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref('/needs');
        this.needRef.on('value', function (descList) {
            var descs2 = [];
            descList.forEach(function (desc) {
                //    descs.push(desc.val());
                var weeklyData = {};
                weeklyData["id"] = desc.key;
                weeklyData["record"] = desc.val();
                //descs.push(desc.val()+" "+desc.key);
                if (_this.isAdmin) {
                    if (weeklyData["record"].status == 'Requested' && weeklyData["record"].advocate === _this.userId) {
                        // alert(weeklyData["record"].desc);
                        descs2.push(weeklyData);
                    }
                    if (weeklyData["record"].status == 'InProgress' && weeklyData["record"].reqBy === _this.userId) {
                        //    alert(weeklyData["record"].desc);
                        descs2.push(weeklyData);
                    }
                    if (weeklyData["record"].status == 'WorkCompleted' && weeklyData["record"].advocate === _this.userId) {
                        //   alert(weeklyData["record"].desc);
                        descs2.push(weeklyData);
                    }
                }
                else {
                    if (weeklyData["record"].status == 'InProgress' && weeklyData["record"].reqBy === _this.userId)
                        descs2.push(weeklyData);
                }
                return false;
            });
            //alert(descs[0].id);
            _this.needList = descs2;
            //this.loadedDescList = descs;
        });
        //alert("needList size is "+this.needList.length);
        if (this.needList === undefined)
            this.needList = [];
    } //end constructor
    AboutPage.prototype.ionViewDidLoad = function () {
        this.userId = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"]().currentUser.uid;
    };
    AboutPage.prototype.onSave = function (cl2) {
        //alert("in onSave and fname is "+cl2.fname+" and lname is "+cl2.lname+" and cell is "+cl2.cell+" and community is "+cl2.community);
        if (!cl2.fname || !cl2.lname || !cl2.cell || !cl2.community) {
            if (this.platform.is('tablet') || this.platform.is('ipad')) {
                this.toast.show("Please fill in all fields", '3000', 'center').subscribe(function (toast) {
                    console.log(toast);
                });
                return false;
            }
            else if (this.platform.is('mobileweb')) {
                var toast = this.toastCtrl.create({
                    message: 'Please fill in all fields',
                    duration: 2000,
                    position: 'bottom'
                });
                toast.present();
            }
            else {
                alert('Please fill in all fields');
                return false;
            }
        }
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        today = mm + '/' + dd + '/' + yyyy;
        this.clt.push({
            "fname": cl2.fname,
            "lname": cl2.lname,
            "cell": cl2.cell,
            "community": cl2.community,
            "addedBy": this.userId,
            "dateAdded": today
        });
        if (this.platform.is('mobileweb')) {
            var toast2 = this.toastCtrl.create({
                message: 'Client added',
                duration: 2000,
                position: 'bottom'
            });
            toast2.present();
        }
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
    };
    AboutPage.prototype.goNot = function () {
        //alert("in goNot");
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__notifications_notifications__["a" /* NotificationsPage */]);
    };
    AboutPage.prototype.onChange = function (com) {
        //alert("search for "+com);
    };
    AboutPage.prototype.openModal = function () {
        var myModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__notifications_notifications__["a" /* NotificationsPage */]);
        myModal.present();
    };
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"C:\needsApp\src\pages\about\about.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      Add a Client\n\n    </ion-title>\n\n    <ion-buttons end>\n\n        <button id="notification-button" ion-button clear (click)="openModal()">\n\n            <ion-icon name="notifications">\n\n              <ion-badge id="notifications-badge" color="danger">{{this.needList.length}}</ion-badge>\n\n            </ion-icon>\n\n        </button>\n\n      </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n<div *ngIf="!isApp" text-center>\n\n\n\n<table width="95%">\n\n<ion-list>\n\n  <ion-item>\n\n    <ion-label color="dark">First Name:  </ion-label>\n\n    <ion-input [(ngModel)]="client.fname"></ion-input>\n\n  </ion-item>\n\n    <ion-item>\n\n    <ion-label color="dark">Last Name:  </ion-label>\n\n    <ion-input [(ngModel)]="client.lname"></ion-input>\n\n  </ion-item>\n\n\n\n    <ion-item>\n\n    <ion-label color="dark">Home/Cell:  </ion-label>\n\n    <ion-input type="tel" [(ngModel)]="client.cell"></ion-input>\n\n  </ion-item>\n\n\n\n\n\n <ion-item>\n\n                  <ion-label>Community</ion-label>\n\n                  <ion-select [(ngModel)]="client.community" (ionChange)="onChange(client.community)">\n\n                    <div *ngFor="let field of descList">\n\n                      <ion-option value="{{field.record.name}}">{{field.record.name}}\n\n                      </ion-option>\n\n                    </div>\n\n                  </ion-select>\n\n </ion-item>\n\n\n\n\n\n</ion-list>\n\n</table>\n\n\n\n</div>\n\n\n\n<div *ngIf="isApp" text-center>\n\n\n\n<br>\n\n\n\n<ion-list>\n\n  <ion-item>\n\n    <ion-label color="dark">First Name:  </ion-label>\n\n    <ion-input [(ngModel)]="client.fname"></ion-input>\n\n  </ion-item>\n\n    <ion-item>\n\n    <ion-label color="dark">Last Name:  </ion-label>\n\n    <ion-input [(ngModel)]="client.lname"></ion-input>\n\n  </ion-item>\n\n\n\n    <ion-item>\n\n    <ion-label color="dark">Cell:  </ion-label>\n\n    <ion-input type="tel" [(ngModel)]="client.cell"></ion-input>\n\n  </ion-item>\n\n\n\n\n\n <ion-item>\n\n                  <ion-label>Community</ion-label>\n\n                  <ion-select [(ngModel)]="client.community">\n\n                    <div *ngFor="let field of descList">\n\n                      <ion-option value="{{field.record.name}}">{{field.record.name}}\n\n                      </ion-option>\n\n                    </div>\n\n                  </ion-select>\n\n </ion-item>\n\n\n\n\n\n</ion-list>\n\n</div>\n\n\n\n<br>\n\n<div text-center>\n\n<button ion-button color="dark" (click) ="onSave(client)">Save</button>\n\n</div>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\needsApp\src\pages\about\about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_toast__["a" /* Toast */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RequestsPage = (function () {
    function RequestsPage(navCtrl, platform, db) {
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.db = db;
        this.platformList = '';
        this.isApp = true;
        var platforms = this.platform.platforms();
        this.platformList = platforms.join(', ');
        if (this.platform.is('core') || this.platform.is('mobileweb')) {
            this.isApp = false;
        }
    } //end constructor
    RequestsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-requests',template:/*ion-inline-start:"C:\needsApp\src\pages\requests\requests.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      Requested Needs\n\n    </ion-title>\n\n   \n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n<br>\n\n<br>\n\n<p><u>Requested Needs</u></p>\n\n\n\n<div *ngFor="let desc of descList" text-center>\n\n\n\n<ion-item>{{desc.record.desc}}<br>\n\n{{desc.record.dateSub}}</ion-item>\n\n\n\n{{descList.length}}\n\n\n\n</div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\needsApp\src\pages\requests\requests.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], RequestsPage);
    return RequestsPage;
}());

//# sourceMappingURL=requests.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AllopenPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__contact_contact__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__notifications_notifications__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AllopenPage = (function () {
    function AllopenPage(navCtrl, platform, db, http) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.db = db;
        this.platformList = '';
        this.isApp = true;
        this.community = {};
        this.com = this.db.list('/communities');
        this.nd = this.db.list('/needs');
        this.ul = this.db.list('/users-list');
        this.http = http;
        this.userId = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"]().currentUser.uid;
        var platforms = this.platform.platforms();
        this.platformList = platforms.join(', ');
        if (this.platform.is('core') || this.platform.is('mobileweb')) {
            this.isApp = false;
        }
        this.descRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref('/needs');
        this.descRef.on('value', function (descList) {
            var descs = [];
            descList.forEach(function (desc) {
                var weeklyData = {};
                weeklyData["id"] = desc.key;
                weeklyData["record"] = desc.val();
                if (weeklyData["record"].status == 'NEW')
                    descs.push(weeklyData);
                return false;
            });
            _this.descList = descs;
            _this.descList.sort(function (a, b) {
                // convert date object into number to resolve issue in typescript
                return +new Date(a.record.dateSub) - +new Date(b.record.dateSub);
            });
            // this.loadedDescList = descs;
        });
        /*this.size$ = new BehaviorSubject(null);
        
        this.items$ = this.size$.switchMap(size =>
             db.list('/needs', ref =>
               status ? ref.orderByChild('dateSub').equalTo('NEW') : ref
             ).snapshotChanges()
           );
        */
        this.userRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref('/users-list');
        this.userRef.on('value', function (descList) {
            var descs4 = '';
            var descs5 = '';
            descList.forEach(function (desc) {
                var weeklyData = {};
                weeklyData["id"] = desc.key;
                weeklyData["record"] = desc.val();
                if (weeklyData["record"].uid == _this.userId) {
                    descs4 = weeklyData["record"].fname + ' ' + weeklyData["record"].lname;
                    descs5 = weeklyData["record"].cell;
                }
                return false;
            });
            _this.reqName = descs4;
            _this.reqCell = descs5;
        });
    } //end constructor
    AllopenPage.prototype.ionViewDidLoad = function () {
        this.userId = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"]().currentUser.uid;
    };
    AllopenPage.prototype.onSave = function (com2) {
        //alert("in onSave and fname is "+cl2.fname+" and lname is "+cl2.lname+" and cell is "+cl2.cell+" and community is "+cl2.community);
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        today = mm + '/' + dd + '/' + yyyy;
        this.com.push({
            "name": com2.name,
            "zip": com2.zip,
            "addedBy": this.userId,
            "dateAdded": today
        });
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
    };
    AllopenPage.prototype.requestItem = function (item) {
        var notes;
        //  alert("items is "+this.items$.)
        item.status = 'Requested';
        //alert("advCell is "+item.record.advocateCell);  
        //edit to Firebase
        this.nd.update(item.id, { status: 'Requested' });
        this.nd.update(item.id, { reqBy: this.userId });
        this.nd.update(item.id, { reqName: this.reqName });
        this.nd.update(item.id, { reqCell: this.reqCell });
        var mmsg = 'Please review a new Request for Need "' + item.record.desc + '"';
        var link2 = 'https://twiliotest-ajvlzxkjds.now.sh/login';
        var params = new __WEBPACK_IMPORTED_MODULE_7__angular_http__["c" /* URLSearchParams */]();
        params.set('msg', mmsg);
        params.set('mto', '["1' + item.record.advocateCell + '"]');
        //Http request-
        this.http.get(link2, {
            search: params
        }).subscribe(function (response) { return console.log('worked'); }, function (error) { return console.log('error'); });
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__contact_contact__["a" /* ContactPage */]);
    };
    AllopenPage.prototype.goNot = function () {
        //alert("in goNot");
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__notifications_notifications__["a" /* NotificationsPage */]);
    };
    AllopenPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-allopen',template:/*ion-inline-start:"C:\needsApp\src\pages\allopen\allopen.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      All Open Needs\n\n    </ion-title>\n\n      </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n<br>\n\n<div text-center>All <u>Open</u> Needs</div>\n\n<br>\n\n<div text-center>(<i>Swipe to the left on a Need to help</i>)</div>\n\n<br>\n\n<div text-center>\n\n\n\n<ion-list>\n\n\n\n  <ion-item-sliding *ngFor="let desc of descList">\n\n\n\n   <ion-item>\n\n\n\n\n\n     <b>Need:  </b>{{desc.record.desc}}<br>\n\n     <b>Status:  </b>{{desc.record.status}}<br>\n\n     <b>Date created:  </b>{{desc.record.dateSub}}<br>\n\n     <b>Community:  </b>{{desc.record.communityId}} <br>\n\n<button ion-button color="danger" round (click)="requestItem(desc)">Contact Advocate</button>\n\n\n\n<button ion-button clear item-end>\n\n<ion-icon name="arrow-forward"></ion-icon>\n\n</button>\n\n\n\n   </ion-item>\n\n\n\n   <ion-item-options>\n\n    <!--<button ion-button color="primary" (click)="editItem(desc)">Edit</button>-->\n\n    <button ion-button color="danger" (click)="requestItem(desc)"><ion-icon trash></ion-icon> Request to Help</button>\n\n   </ion-item-options>\n\n  </ion-item-sliding>\n\n\n\n\n\n</ion-list>\n\n\n\n</div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\needsApp\src\pages\allopen\allopen.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_7__angular_http__["a" /* Http */]])
    ], AllopenPage);
    return AllopenPage;
}());

//# sourceMappingURL=allopen.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AllclosedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AllclosedPage = (function () {
    function AllclosedPage(navCtrl, platform, db) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.db = db;
        this.platformList = '';
        this.isApp = true;
        this.community = {};
        this.com = this.db.list('/communities');
        var platforms = this.platform.platforms();
        this.platformList = platforms.join(', ');
        if (this.platform.is('core') || this.platform.is('mobileweb')) {
            this.isApp = false;
        }
        this.descRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref('/needs');
        this.descRef.on('value', function (descList) {
            var descs = [];
            descList.forEach(function (desc) {
                var weeklyData = {};
                weeklyData["id"] = desc.key;
                weeklyData["record"] = desc.val();
                if (weeklyData["record"].status == 'CLOSED')
                    descs.push(weeklyData);
                return false;
            });
            _this.descList = descs;
            _this.descList.sort(function (a, b) {
                // convert date object into number to resolve issue in typescript
                return +new Date(a.record.dateComp) - +new Date(b.record.dateComp);
            });
        });
    } //end constructor
    AllclosedPage.prototype.ionViewDidLoad = function () {
        this.userId = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"]().currentUser.uid;
    };
    AllclosedPage.prototype.onSave = function (com2) {
        //alert("in onSave and fname is "+cl2.fname+" and lname is "+cl2.lname+" and cell is "+cl2.cell+" and community is "+cl2.community);
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        today = mm + '/' + dd + '/' + yyyy;
        this.com.push({
            "name": com2.name,
            "zip": com2.zip,
            "addedBy": this.userId,
            "dateAdded": today
        });
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
    };
    AllclosedPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-allclosed',template:/*ion-inline-start:"C:\needsApp\src\pages\allclosed\allclosed.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      All Closed Needs\n\n    </ion-title>\n\n   \n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n\n\n<br>\n\n<div text-center>All <u>Closed</u> Needs</div>\n\n<br>\n\n<div text-center>\n\n<div *ngFor="let desc of descList" text-center>\n\n\n\n<ion-item><b>Need Desc:</b>  {{desc.record.desc}}<br>\n\n<b>Date Closed:</b>  {{desc.record.dateComp}}<br>\n\n<b>Community:</b>  {{desc.record.communityId}}</ion-item>\n\n\n\n</div>\n\n</div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\needsApp\src\pages\allclosed\allclosed.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], AllclosedPage);
    return AllclosedPage;
}());

//# sourceMappingURL=allclosed.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchopenPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__contact_contact__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SearchopenPage = (function () {
    function SearchopenPage(navCtrl, platform, db, params, http) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.db = db;
        this.params = params;
        this.platformList = '';
        this.isApp = true;
        this.community = {};
        this.com = this.db.list('/communities');
        this.nd = this.db.list('/needs');
        this.http = http;
        this.userId = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"]().currentUser.uid;
        this.comSearch = this.params.get('comPassed');
        var platforms = this.platform.platforms();
        this.platformList = platforms.join(', ');
        if (this.platform.is('core') || this.platform.is('mobileweb')) {
            this.isApp = false;
        }
        this.descRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref('/needs');
        this.descRef.on('value', function (descList) {
            var descs = [];
            descList.forEach(function (desc) {
                //    descs.push(desc.val());
                var weeklyData = {};
                weeklyData["id"] = desc.key;
                weeklyData["record"] = desc.val();
                //descs.push(desc.val()+" "+desc.key);
                //alert("status is "+weeklyData.record.status+" and community id is "+this.comSearch);
                if (weeklyData["record"].status == 'NEW' && weeklyData["record"].communityId == _this.comSearch)
                    descs.push(weeklyData);
                return false;
            });
            //alert(descs[0].id);
            _this.descList = descs;
            _this.descList = descs;
            _this.descList.sort(function (a, b) {
                // convert date object into number to resolve issue in typescript
                return +new Date(a.record.dateSub) - +new Date(b.record.dateSub);
            });
            // this.loadedDescList = descs;
        });
        this.userRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref('/users-list');
        this.userRef.on('value', function (descList) {
            var descs4 = '';
            var descs5 = '';
            descList.forEach(function (desc) {
                var weeklyData = {};
                weeklyData["id"] = desc.key;
                weeklyData["record"] = desc.val();
                if (weeklyData["record"].uid == _this.userId) {
                    descs4 = weeklyData["record"].fname + ' ' + weeklyData["record"].lname;
                    descs5 = weeklyData["record"].cell;
                }
                return false;
            });
            _this.reqName = descs4;
            _this.reqCell = descs5;
        });
    } //end constructor
    SearchopenPage.prototype.ionViewDidLoad = function () {
        this.userId = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"]().currentUser.uid;
    };
    SearchopenPage.prototype.onSave = function (com2) {
        //alert("in onSave and fname is "+cl2.fname+" and lname is "+cl2.lname+" and cell is "+cl2.cell+" and community is "+cl2.community);
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        today = mm + '/' + dd + '/' + yyyy;
        this.com.push({
            "name": com2.name,
            "zip": com2.zip,
            "addedBy": this.userId,
            "dateAdded": today
        });
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
    };
    SearchopenPage.prototype.requestItem = function (item) {
        item.status = 'Requested';
        //  alert("id is "+item.id+" and status is "+item.status);
        //edit to Firebase
        this.nd.update(item.id, { status: 'Requested' });
        this.nd.update(item.id, { reqBy: this.userId });
        this.nd.update(item.id, { reqName: this.reqName });
        this.nd.update(item.id, { reqCell: this.reqCell });
        var mmsg = 'Please review a new Request for Need "' + item.record.desc + '"';
        var link2 = 'https://twiliotest-ajvlzxkjds.now.sh/login';
        var params = new __WEBPACK_IMPORTED_MODULE_6__angular_http__["c" /* URLSearchParams */]();
        params.set('msg', mmsg);
        params.set('mto', '["1' + item.record.advocateCell + '"]');
        //Http request-
        this.http.get(link2, {
            search: params
        }).subscribe(function (response) { return console.log('worked'); }, function (error) { return console.log('error'); });
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__contact_contact__["a" /* ContactPage */]);
    };
    SearchopenPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-searchopen',template:/*ion-inline-start:"C:\needsApp\src\pages\searchopen\searchopen.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      Search Open Needs\n\n    </ion-title>\n\n\n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n<br>\n\n<div text-center>{{comSearch}} <u>Open</u> Needs</div>\n\n<br>\n\n<div text-center>(<i>Swipe to the left on a Need to help</i>)</div>\n\n<br>\n\n\n\n<div text-center>\n\n\n\n<ion-list>\n\n\n\n  <ion-item-sliding *ngFor="let desc of descList">\n\n\n\n   <ion-item>\n\n     <b>Need:  </b>{{desc.record.desc}}<br>\n\n     <b>Status:  </b>{{desc.record.status}}<br>\n\n     <b>Date created:  </b>{{desc.record.dateSub}}<br>\n\n     <b>Community:  </b>{{desc.record.communityId}}<br>\n\n<button ion-button color="danger" round (click)="requestItem(desc)">Contact Advocate</button>\n\n\n\n<button ion-button clear item-end>\n\n<ion-icon name="arrow-forward"></ion-icon>\n\n</button>\n\n\n\n   </ion-item>\n\n\n\n   <ion-item-options>\n\n    <!--<button ion-button color="primary" (click)="editItem(desc)">Edit</button>-->\n\n    <button ion-button color="danger" (click)="requestItem(desc)"><ion-icon trash></ion-icon> Request to Help</button>\n\n   </ion-item-options>\n\n  </ion-item-sliding>\n\n\n\n\n\n</ion-list>\n\n\n\n\n\n</div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\needsApp\src\pages\searchopen\searchopen.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_6__angular_http__["a" /* Http */]])
    ], SearchopenPage);
    return SearchopenPage;
}());

//# sourceMappingURL=searchopen.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchclosedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SearchclosedPage = (function () {
    function SearchclosedPage(navCtrl, platform, db, params) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.db = db;
        this.params = params;
        this.platformList = '';
        this.isApp = true;
        this.community = {};
        this.com = this.db.list('/communities');
        this.comSearch = this.params.get('comPassed');
        var platforms = this.platform.platforms();
        this.platformList = platforms.join(', ');
        if (this.platform.is('core') || this.platform.is('mobileweb')) {
            this.isApp = false;
        }
        this.descRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref('/needs');
        this.descRef.on('value', function (descList) {
            var descs = [];
            descList.forEach(function (desc) {
                //    descs.push(desc.val());
                var weeklyData = {};
                weeklyData["id"] = desc.key;
                weeklyData["record"] = desc.val();
                //descs.push(desc.val()+" "+desc.key);
                //alert("status is "+weeklyData.record.status+" and community id is "+this.comSearch);
                if (weeklyData["record"].status == 'CLOSED' && weeklyData["record"].communityId == _this.comSearch)
                    descs.push(weeklyData);
                return false;
            });
            //alert(descs[0].id);
            _this.descList = descs;
            // this.loadedDescList = descs;
            _this.descList.sort(function (a, b) {
                // convert date object into number to resolve issue in typescript
                return +new Date(a.record.dateComp) - +new Date(b.record.dateComp);
            });
        });
    } //end constructor
    SearchclosedPage.prototype.ionViewDidLoad = function () {
        this.userId = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"]().currentUser.uid;
    };
    SearchclosedPage.prototype.onSave = function (com2) {
        //alert("in onSave and fname is "+cl2.fname+" and lname is "+cl2.lname+" and cell is "+cl2.cell+" and community is "+cl2.community);
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        today = mm + '/' + dd + '/' + yyyy;
        this.com.push({
            "name": com2.name,
            "zip": com2.zip,
            "addedBy": this.userId,
            "dateAdded": today
        });
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
    };
    SearchclosedPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-searchclosed',template:/*ion-inline-start:"C:\needsApp\src\pages\searchclosed\searchclosed.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      Search Closed Needs\n\n    </ion-title>\n\n   \n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n\n\n<br>\n\n<div text-center>{{comSearch}} <u>Closed</u> Needs</div>\n\n<br>\n\n<div text-center>\n\n<div *ngFor="let desc of descList" text-center>\n\n\n\n<ion-item><b>Need Desc:</b>  {{desc.record.desc}}<br>\n\n<b>Date Closed:</b>  {{desc.record.dateComp}}</ion-item>\n\n\n\n</div>\n\n</div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\needsApp\src\pages\searchclosed\searchclosed.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], SearchclosedPage);
    return SearchclosedPage;
}());

//# sourceMappingURL=searchclosed.js.map

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApproveusereditPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__approveuser_approveuser__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__notifications_notifications__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_BehaviorSubject__ = __webpack_require__(468);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_http__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_toast__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var ApproveusereditPage = (function () {
    function ApproveusereditPage(navCtrl, platform, db, params, afAuth, http, toast, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.db = db;
        this.params = params;
        this.afAuth = afAuth;
        this.toast = toast;
        this.toastCtrl = toastCtrl;
        this.platformList = '';
        this.isApp = true;
        this.isAdmin = false;
        this.newuser = {};
        this.nu = this.db.list('/users-list');
        this.com = this.db.list('/users-pending');
        this.user = {};
        this.data = {};
        this.userId = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"]().currentUser.uid;
        this.http = http;
        this.fname = this.params.get('firstPassed');
        this.lname = this.params.get('secondPassed');
        this.cell = this.params.get('thirdPassed');
        this.defaultCom = this.params.get('fourthPassed');
        this.key2 = this.params.get('fifthPassed');
        this.email = this.params.get('sixthPassed');
        this.pass2 = this.params.get('seventhPassed');
        //alert("fname passed in is "+this.fname+" and key is "+this.key2);
        var platforms = this.platform.platforms();
        this.platformList = platforms.join(', ');
        if (this.platform.is('core') || this.platform.is('mobileweb')) {
            this.isApp = false;
        }
        /*
        this.descRef = firebase.database().ref('/communities');
        
        this.descRef.on('value', descList => {
          let descs = [];
          descList.forEach( desc => {
            var weeklyData = {};
        
            weeklyData["id"] = desc.key;
            weeklyData["record"] = desc.val();
            descs.push(weeklyData);
          return false;
          });
        
        
          this.descList = descs;
        });
        */
        this.size$ = new __WEBPACK_IMPORTED_MODULE_8_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this.items$ = this.size$.switchMap(function (size) {
            return db.list('/needs', function (ref) {
                return status ? ref.orderByChild('dateSub').equalTo('NEW') : ref;
            }).snapshotChanges();
        });
        this.descRef2 = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["database"]().ref('/users-list');
        this.descRef2.on('value', function (descList) {
            var temp = false;
            var descs5 = [];
            descList.forEach(function (desc) {
                var weeklyData = {};
                weeklyData["id"] = desc.key;
                weeklyData["record"] = desc.val();
                //alert("this userId is "+this.userId+" and array uid is "+weeklyData["record"].uid);
                if (weeklyData["record"].uid == _this.userId) {
                    descs5.push(weeklyData);
                    if (weeklyData["record"].type == 'A')
                        temp = true;
                    else
                        temp = false;
                }
                return false;
            });
            //  this.descList = descs5;
            _this.isAdmin = temp;
        });
        this.needRef = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["database"]().ref('/needs');
        this.needRef.on('value', function (descList) {
            var descs2 = [];
            descList.forEach(function (desc) {
                //    descs.push(desc.val());
                var weeklyData = {};
                weeklyData["id"] = desc.key;
                weeklyData["record"] = desc.val();
                //descs.push(desc.val()+" "+desc.key);
                if (_this.isAdmin) {
                    if (weeklyData["record"].status == 'Requested' && weeklyData["record"].advocate === _this.userId) {
                        // alert(weeklyData["record"].desc);
                        descs2.push(weeklyData);
                    }
                    if (weeklyData["record"].status == 'InProgress' && weeklyData["record"].reqBy === _this.userId) {
                        //    alert(weeklyData["record"].desc);
                        descs2.push(weeklyData);
                    }
                    if (weeklyData["record"].status == 'WorkCompleted' && weeklyData["record"].advocate === _this.userId) {
                        //   alert(weeklyData["record"].desc);
                        descs2.push(weeklyData);
                    }
                }
                else {
                    if (weeklyData["record"].status == 'InProgress' && weeklyData["record"].reqBy === _this.userId)
                        descs2.push(weeklyData);
                }
                return false;
            });
            //alert(descs[0].id);
            _this.needList = descs2;
            //this.loadedDescList = descs;
        });
    } //end constructor
    ApproveusereditPage.prototype.ionViewDidLoad = function () {
        this.userId = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"]().currentUser.uid;
    };
    ApproveusereditPage.prototype.onSave = function (typeUser) {
        //alert("in onSave and fname is "+cl2.fname+" and lname is "+cl2.lname+" and cell is "+cl2.cell+" and community is "+cl2.community);
        var _this = this;
        if (!typeUser) {
            if (this.platform.is('tablet') || this.platform.is('ipad')) {
                this.toast.show("Please select a user type", '3000', 'center').subscribe(function (toast) {
                    console.log(toast);
                });
                return false;
            }
            else if (this.platform.is('mobileweb')) {
                var toast = this.toastCtrl.create({
                    message: 'Please fill in all fields',
                    duration: 2000,
                    position: 'bottom'
                });
                toast.present();
            }
            else {
                alert('Please select a user type');
                return false;
            }
        }
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        today = mm + '/' + dd + '/' + yyyy;
        //officially register with Firebase
        this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.pass2)
            .then(function (user) {
            //push to users-list table
            _this.nu.push({
                "fname": _this.fname,
                "lname": _this.lname,
                "cell": _this.cell,
                "defaultCom": _this.defaultCom,
                "addedBy": _this.userId,
                "dateAdded": today,
                "type": typeUser,
                "email": _this.email,
                "uid": user.uid
            });
            //delete need to delete from users-pending
            _this.com.remove(_this.key2).then(function (_) { return console.log('deleted!'); });
            //send SMS to notify user
            var sendEmail = _this.cell + '@messaging.sprintpcs.com';
            //alert("sendEmail is "+sendEmail);
            //send SMS
            var link = 'https://jasongillikin.000webhostapp.com/blueEmail2.php';
            var mmsg = 'Your Needs App account has been activated, you can now login.';
            var link2 = 'https://till-node-demo-iizbwqdopi.now.sh/login';
            var myData;
            var message;
            myData = JSON.stringify({ emailS: 'Your Needs account has been activiated', toS: sendEmail });
            var params = new __WEBPACK_IMPORTED_MODULE_9__angular_http__["c" /* URLSearchParams */]();
            params.set('msg', mmsg);
            params.set('mto', '["1' + _this.cell + '"]');
            //Http request-
            _this.http.get(link2, {
                search: params
            }).subscribe(function (response) { return console.log('worked'); }, function (error) { return console.log('error'); });
            /* this.http.post(link,myData)
             .subscribe(data => {
             this.data.response = "OK";
             }, error => {
             console.log("oops");
             });*/
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
        })
            .catch(function (error) { return _this.handleError(error); });
    };
    ApproveusereditPage.prototype.reject = function () {
        //  alert("in reject");
        this.com.remove(this.key2).then(function (_) { return console.log('deleted!'); });
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__approveuser_approveuser__["a" /* ApproveuserPage */]);
    };
    ApproveusereditPage.prototype.goNot = function () {
        //alert("in goNot");
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__notifications_notifications__["a" /* NotificationsPage */]);
    };
    ApproveusereditPage.prototype.onChange = function (com) {
        //alert("search for "+com);
    };
    // If error, console log and notify user
    ApproveusereditPage.prototype.handleError = function (error) {
        console.error(error);
        //this.notify.update(error.message, 'error');
    };
    ApproveusereditPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-approveuseredit',template:/*ion-inline-start:"C:\needsApp\src\pages\approveuseredit\approveuseredit.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      Manage new User Request\n\n    </ion-title>\n\n    <ion-buttons end>\n\n        <button id="notification-button" ion-button clear (click)="goNot()">\n\n            <ion-icon name="notifications">\n\n              <ion-badge id="notifications-badge" color="danger">{{this.needList.length}}</ion-badge>\n\n\n\n            </ion-icon>\n\n        </button>\n\n      </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n<div *ngIf="!isApp" text-center>\n\n\n\n<table width="75%" align="center">\n\n<ion-list>\n\n<ion-input placeholder="First Name:  {{fname}}" clearInput></ion-input>\n\n<ion-input placeholder="Last Name:  {{lname}}" clearInput></ion-input>\n\n<ion-input placeholder="Cell:  {{cell}}" clearInput></ion-input>\n\n<ion-input placeholder="Community:  {{defaultCom}}" clearInput></ion-input>\n\n<br>\n\n<ion-item>\n\n  <ion-label>Account Type:  </ion-label>\n\n  <ion-select [(ngModel)]="newuser.type">\n\n      <ion-option value="A">Advocate</ion-option>\n\n      <ion-option value="N">Neighbor</ion-option>\n\n  </ion-select>\n\n</ion-item>\n\n\n\n\n\n</ion-list>\n\n</table>\n\n\n\n</div>\n\n\n\n<div *ngIf="isApp" text-center>\n\n\n\n<br>\n\n\n\n\n\n<ion-list>\n\n  <ion-input placeholder="First Name:  {{fname}}" clearInput></ion-input>\n\n  <ion-input placeholder="Last Name:  {{lname}}" clearInput></ion-input>\n\n  <ion-input placeholder="Cell:  {{cell}}" clearInput></ion-input>\n\n  <ion-input placeholder="Community:  {{defaultCom}}" clearInput></ion-input>\n\n  <br>\n\n  <ion-item>\n\n    <ion-label>Account Type:  </ion-label>\n\n    <ion-select [(ngModel)]="newuser.type">\n\n        <ion-option value="A">Advocate</ion-option>\n\n        <ion-option value="N">Neighbor</ion-option>\n\n    </ion-select>\n\n  </ion-item>\n\n\n\n\n\n</ion-list>\n\n</div>\n\n\n\n<br>\n\n<div text-center>\n\n<button ion-button color="dark" (click) ="onSave(newuser.type)">Approve</button>\n\n<button ion-button color="danger" (click) ="reject()">Reject</button>\n\n</div>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\needsApp\src\pages\approveuseredit\approveuseredit.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_9__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_toast__["a" /* Toast */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */]])
    ], ApproveusereditPage);
    return ApproveusereditPage;
}());

//# sourceMappingURL=approveuseredit.js.map

/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MorePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__listcommunity_listcommunity__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__manageclients_manageclients__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__manageneeds_manageneeds__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__manageusers_manageusers__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__notifications_notifications__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_auth__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase_app__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__login_login__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__allclosed2_allclosed2__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__creed_creed__ = __webpack_require__(304);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var MorePage = (function () {
    function MorePage(navCtrl, db, modalCtrl, afA, app) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.db = db;
        this.modalCtrl = modalCtrl;
        this.afA = afA;
        this.app = app;
        this.isAllAdmin = false;
        this.isAdmin = false;
        this.isSpecialAdmin = false;
        this.isReportAdmin = false;
        this.userId = __WEBPACK_IMPORTED_MODULE_9_firebase_app__["auth"]().currentUser.uid;
        if (this.userId == 'quh5AGVVCKb3npQkxCxPzKBmaC52')
            this.isSpecialAdmin = true;
        /*    this.size$ = new BehaviorSubject(null);
        
           this.items$ = this.size$.switchMap(size =>
                 db.list('/needs', ref =>
                   status ? ref.orderByChild('dateSub').equalTo('NEW') : ref
                 ).snapshotChanges()
               );*/
        this.descRef2 = __WEBPACK_IMPORTED_MODULE_9_firebase_app__["database"]().ref('/users-list');
        this.descRef2.on('value', function (descList) {
            var temp = false;
            var descs5 = [];
            descList.forEach(function (desc) {
                var weeklyData = {};
                weeklyData["id"] = desc.key;
                weeklyData["record"] = desc.val();
                //alert("this userId is "+this.userId+" and array uid is "+weeklyData["record"].uid);
                if (weeklyData["record"].uid == _this.userId) {
                    descs5.push(weeklyData);
                    if (weeklyData["record"].type == 'A')
                        temp = true;
                    else
                        temp = false;
                }
                return false;
            });
            //  this.descList = descs5;
            _this.isAdmin = temp;
            _this.needRef = __WEBPACK_IMPORTED_MODULE_9_firebase_app__["database"]().ref('/needs');
            _this.needRef.on('value', function (descList) {
                var descs2 = [];
                descList.forEach(function (desc) {
                    var weeklyData = {};
                    weeklyData["id"] = desc.key;
                    weeklyData["record"] = desc.val();
                    //descs.push(desc.val()+" "+desc.key);
                    if (_this.isAdmin) {
                        if (weeklyData["record"].status == 'Requested' && weeklyData["record"].advocate === _this.userId)
                            descs2.push(weeklyData);
                        if (weeklyData["record"].status == 'InProgress' && weeklyData["record"].reqBy === _this.userId)
                            descs2.push(weeklyData);
                        if (weeklyData["record"].status == 'WorkCompleted' && weeklyData["record"].advocate === _this.userId)
                            descs2.push(weeklyData);
                    }
                    else {
                        if (weeklyData["record"].status == 'InProgress' && weeklyData["record"].reqBy === _this.userId)
                            descs2.push(weeklyData);
                    }
                    return false;
                });
                //alert(descs[0].id);
                _this.needList = descs2;
                //this.loadedDescList = descs;
            });
        });
        //alert("needList size is "+this.needList.length);
        if (this.needList === undefined)
            this.needList = [];
        this.allRef = __WEBPACK_IMPORTED_MODULE_9_firebase_app__["database"]().ref('/users-list');
        this.allRef.on('value', function (descList) {
            var descs3 = [];
            var temp = false;
            var temp2 = false;
            var temp3 = false;
            descList.forEach(function (desc) {
                var weeklyData = {};
                weeklyData["id"] = desc.key;
                weeklyData["record"] = desc.val();
                if (weeklyData["record"].uid == _this.userId && weeklyData["record"].alladmin == '1' && weeklyData["record"].type == 'A') {
                    descs3.push(weeklyData);
                    temp = true;
                    //alert("setting to true and uid is "+this.userId+" and alladmin is "+weeklyData["record"].alladmin+" "+weeklyData["record"].cell);
                    //     return true;   
                }
                if (weeklyData["record"].uid == _this.userId && weeklyData["record"].type == 'A') {
                    temp2 = true;
                    //return true;
                }
                if (weeklyData["record"].uid == _this.userId && weeklyData["record"].reportType == 'A')
                    temp3 = true;
                return false;
            });
            //alert(descs[0].id);
            _this.isAllAdmin = temp;
            _this.isAdmin = temp2;
            _this.isReportAdmin = temp3;
            _this.allList = descs3;
        });
    } //end constructor
    MorePage.prototype.ionViewDidLoad = function () {
        this.userId = __WEBPACK_IMPORTED_MODULE_9_firebase_app__["auth"]().currentUser.uid;
    };
    MorePage.prototype.goNot = function () {
        //alert("in goNot");
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__notifications_notifications__["a" /* NotificationsPage */]);
    };
    MorePage.prototype.open1 = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__listcommunity_listcommunity__["a" /* ListcommunityPage */]);
    };
    MorePage.prototype.open2 = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__manageclients_manageclients__["a" /* ManageclientsPage */]);
    };
    MorePage.prototype.open4 = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__manageneeds_manageneeds__["a" /* ManageneedsPage */]);
    };
    MorePage.prototype.open5 = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__manageusers_manageusers__["a" /* ManageusersPage */]);
    };
    MorePage.prototype.open6 = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__allclosed2_allclosed2__["a" /* Allclosed2Page */]);
    };
    MorePage.prototype.openModal = function () {
        var myModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__notifications_notifications__["a" /* NotificationsPage */]);
        myModal.present();
    };
    MorePage.prototype.showAbout = function () {
        var myModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_12__creed_creed__["a" /* CreedPage */]);
        myModal.present();
    };
    MorePage.prototype.setNoti = function () {
        //alert("Let Jason now how often you want to receive notificatons :-) ");
    };
    MorePage.prototype.logOff = function () {
        //alert("in logout");
        /*  this.afA.auth.signOut().then(() => {
        
            this.navCtrl.setRoot(LoginPage);
             //this.app.getRootNav().setRoot(LoginPage);
          }); */
        var user = this.afA.auth.signOut();
        this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_10__login_login__["a" /* LoginPage */]); // Better way to fix this line?
    };
    MorePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-more',template:/*ion-inline-start:"C:\needsApp\src\pages\more\more.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-buttons end>\n\n        <button id="notification-button" ion-button clear (click)="openModal()">\n\n            <ion-icon name="notifications">\n\n              <ion-badge id="notifications-badge" color="danger">{{this.needList.length}}</ion-badge>\n\n            </ion-icon>\n\n        </button>\n\n      </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n<ion-list>\n\n<div *ngIf="isSpecialAdmin">\n\n<ion-item (click)="open1()">\n\nAdd/Remove Communities\n\n</ion-item>\n\n</div>\n\n\n\n<div *ngIf="isSpecialAdmin">\n\n<ion-item (click)="open2()">\n\nManage Clients\n\n</ion-item>\n\n</div>\n\n\n\n<div *ngIf="isSpecialAdmin">\n\n<ion-item (click)="open4()">\n\nDelete a Need\n\n</ion-item>\n\n</div>\n\n\n\n<div *ngIf="isSpecialAdmin">\n\n<ion-item (click)="open5()">\n\nList all Advocates and Neighbors\n\n</ion-item>\n\n</div>\n\n\n\n<div *ngIf="isReportAdmin">\n\n<ion-item (click)="open6()">\n\nHistorical Needs Report\n\n</ion-item>\n\n</div>\n\n\n\n<!--\n\n<ion-item (click)="setNoti()">\n\nNotificatons\n\n</ion-item>\n\n-->\n\n\n\n<ion-item (click)="logOff()">\n\nLog Off\n\n</ion-item>\n\n<ion-item (click)="showAbout()">\n\nAbout\n\n</ion-item>\n\n</ion-list>\n\n\n\n<br>\n\n<br>\n\n<br>\n\n<br>\n\n<br>\n\n<p text-center>\n\nVersion 1\n\n</p>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\needsApp\src\pages\more\more.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_8_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]])
    ], MorePage);
    return MorePage;
}());

//# sourceMappingURL=more.js.map

/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListcommunityPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ListcommunityPage = (function () {
    function ListcommunityPage(navCtrl, platform, db, toast, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.db = db;
        this.toast = toast;
        this.toastCtrl = toastCtrl;
        this.platformList = '';
        this.isApp = true;
        this.community = {};
        this.com = this.db.list('/communities');
        var platforms = this.platform.platforms();
        this.platformList = platforms.join(', ');
        if (this.platform.is('core') || this.platform.is('mobileweb')) {
            this.isApp = false;
        }
        this.descRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref('/communities');
        this.descRef.on('value', function (descList) {
            var descs = [];
            descList.forEach(function (desc) {
                //    descs.push(desc.val());
                var weeklyData = {};
                weeklyData["id"] = desc.key;
                weeklyData["record"] = desc.val();
                //descs.push(desc.val()+" "+desc.key);
                descs.push(weeklyData);
                return false;
            });
            //alert(descs[0].id);
            _this.descList = descs;
            //this.loadedDescList = descs;
        });
    } //end constructor
    ListcommunityPage_1 = ListcommunityPage;
    ListcommunityPage.prototype.ionViewDidLoad = function () {
        this.userId = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"]().currentUser.uid;
    };
    ListcommunityPage.prototype.onSave = function (com2) {
        //alert("in onSave and com is "+com2.name);
        if (!com2.name || !com2.zip) {
            if (this.platform.is('tablet') || this.platform.is('ipad')) {
                this.toast.show("Please enter a Community name and Zip", '3000', 'center').subscribe(function (toast) {
                    console.log(toast);
                });
                return false;
            }
            else if (this.platform.is('mobileweb')) {
                var toast = this.toastCtrl.create({
                    message: 'Please enter a Community name and Zip',
                    duration: 2000,
                    position: 'bottom'
                });
                toast.present();
            }
            else {
                alert('Please enter a Community name and Zip');
                return false;
            }
        }
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        today = mm + '/' + dd + '/' + yyyy;
        this.com.push({
            "name": com2.name,
            "zip": com2.zip,
            "addedBy": this.userId,
            "dateAdded": today
        });
        this.navCtrl.setRoot(ListcommunityPage_1);
    };
    ListcommunityPage.prototype.removeItem = function (item) {
        //alert("delete record "+item.id);
        //delete from Firebase
        this.com.remove(item.id).then(function (_) { return console.log('deleted!'); });
        /*for(var i = 0; i < this.descList.length; i++) {
         
              if(this.descList[i] == item){
                this.descList.splice(i, 1);
              }
         
            }*/
    };
    ListcommunityPage = ListcommunityPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-listcommunity',template:/*ion-inline-start:"C:\needsApp\src\pages\listcommunity\listcommunity.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      Settings\n\n    </ion-title>\n\n   \n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n<p text-center>\n\nAdd a New Community\n\n</p>\n\n<ion-list>\n\n<ion-item>\n\n<ion-label>Community Name:</ion-label>\n\n<ion-input type="text" [(ngModel)]="community.name"></ion-input>\n\n</ion-item>\n\n<ion-item>\n\n<ion-label>Zip Code:</ion-label>\n\n<ion-input type="number" [(ngModel)]="community.zip"></ion-input>\n\n</ion-item>\n\n\n\n <ion-item>   \n\n   <button ion-button color="dark" (click)="onSave(community)">Add New</button>\n\n </ion-item>\n\n\n\n</ion-list>\n\n<hr>\n\n<br>\n\n\n\n<p text-center><u>Current Communities</u></p>\n\n\n\n<ion-list>\n\n\n\n <ion-item-sliding *ngFor="let desc of descList">\n\n\n\n  <ion-item>\n\n   {{desc.record.name}}\n\n<button ion-button clear item-end>\n\n<ion-icon name="arrow-forward"></ion-icon>\n\n</button>\n\n\n\n  </ion-item>\n\n\n\n\n\n  <ion-item-options>\n\n   <button ion-button color="danger" (click)="removeItem(desc)"><ion-icon trash></ion-icon> Delete</button>\n\n  </ion-item-options>\n\n </ion-item-sliding>\n\n\n\n</ion-list>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\needsApp\src\pages\listcommunity\listcommunity.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__["a" /* Toast */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */]])
    ], ListcommunityPage);
    return ListcommunityPage;
    var ListcommunityPage_1;
}());

//# sourceMappingURL=listcommunity.js.map

/***/ }),

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageclientsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase_app__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ManageclientsPage = (function () {
    function ManageclientsPage(navCtrl, platform, db) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.db = db;
        this.platformList = '';
        this.isApp = true;
        this.community = {};
        this.com = this.db.list('/clients');
        var platforms = this.platform.platforms();
        this.platformList = platforms.join(', ');
        if (this.platform.is('core') || this.platform.is('mobileweb')) {
            this.isApp = false;
        }
        this.descRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref('/clients');
        this.descRef.on('value', function (descList) {
            var descs = [];
            descList.forEach(function (desc) {
                //    descs.push(desc.val());
                var weeklyData = {};
                weeklyData["id"] = desc.key;
                weeklyData["record"] = desc.val();
                //descs.push(desc.val()+" "+desc.key);
                descs.push(weeklyData);
                return false;
            });
            //alert(descs[0].id);
            _this.descList = descs;
            //this.loadedDescList = descs;
        });
    } //end constructor
    ManageclientsPage.prototype.ionViewDidLoad = function () {
        this.userId = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"]().currentUser.uid;
    };
    ManageclientsPage.prototype.removeItem = function (item) {
        //alert("delete record "+item.id);
        //delete from Firebase
        this.com.remove(item.id).then(function (_) { return console.log('deleted!'); });
        /*for(var i = 0; i < this.descList.length; i++) {
         
              if(this.descList[i] == item){
                this.descList.splice(i, 1);
              }
         
            }*/
    };
    ManageclientsPage.prototype.editItem = function (item) {
        //alert("delete record "+item.id);
        //delete from Firebase
        //this.com.remove(item.id).then(_ => console.log('deleted!'));
        /*for(var i = 0; i < this.descList.length; i++) {
         
              if(this.descList[i] == item){
                this.descList.splice(i, 1);
              }
         
            }*/
    };
    ManageclientsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-manageclients',template:/*ion-inline-start:"C:\needsApp\src\pages\manageclients\manageclients.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      Settings\n\n    </ion-title>\n\n\n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n<p text-center><u>Current Clients</u></p>\n\n\n\n<ion-list>\n\n\n\n <ion-item-sliding *ngFor="let desc of descList">\n\n\n\n  <ion-item>\n\n   {{desc.record.fname}} {{desc.record.lname}}\n\n<button ion-button clear item-end>\n\n<ion-icon name="arrow-forward"></ion-icon>\n\n</button>\n\n  </ion-item>\n\n\n\n  <ion-item-options>\n\n   <!--<button ion-button color="primary" (click)="editItem(desc)">Edit</button>-->\n\n   <button ion-button color="danger" (click)="removeItem(desc)"><ion-icon trash></ion-icon> Delete</button>\n\n  </ion-item-options>\n\n </ion-item-sliding>\n\n\n\n</ion-list>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\needsApp\src\pages\manageclients\manageclients.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], ManageclientsPage);
    return ManageclientsPage;
}());

//# sourceMappingURL=manageclients.js.map

/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageneedsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase_app__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ManageneedsPage = (function () {
    function ManageneedsPage(navCtrl, platform, db) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.db = db;
        this.platformList = '';
        this.isApp = true;
        this.community = {};
        this.com = this.db.list('/needs');
        var platforms = this.platform.platforms();
        this.platformList = platforms.join(', ');
        if (this.platform.is('core') || this.platform.is('mobileweb')) {
            this.isApp = false;
        }
        this.descRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref('/needs');
        this.descRef.on('value', function (descList) {
            var descs = [];
            descList.forEach(function (desc) {
                //    descs.push(desc.val());
                var weeklyData = {};
                weeklyData["id"] = desc.key;
                weeklyData["record"] = desc.val();
                //descs.push(desc.val()+" "+desc.key);
                descs.push(weeklyData);
                return false;
            });
            //alert(descs[0].id);
            _this.descList = descs;
            //this.loadedDescList = descs;
        });
    } //end constructor
    ManageneedsPage.prototype.ionViewDidLoad = function () {
        this.userId = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"]().currentUser.uid;
    };
    ManageneedsPage.prototype.removeItem = function (item) {
        //alert("delete record "+item.id);
        //delete from Firebase
        this.com.remove(item.id).then(function (_) { return console.log('deleted!'); });
        /*for(var i = 0; i < this.descList.length; i++) {
        
              if(this.descList[i] == item){
                this.descList.splice(i, 1);
              }
        
            }*/
    };
    ManageneedsPage.prototype.editItem = function (item) {
        //alert("delete record "+item.id);
        //delete from Firebase
        //this.com.remove(item.id).then(_ => console.log('deleted!'));
        /*for(var i = 0; i < this.descList.length; i++) {
        
              if(this.descList[i] == item){
                this.descList.splice(i, 1);
              }
        
            }*/
    };
    ManageneedsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-manageneeds',template:/*ion-inline-start:"C:\needsApp\src\pages\manageneeds\manageneeds.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      Settings\n\n    </ion-title>\n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n<p text-center><u>Manage Needs</u></p>\n\n\n\n<ion-list>\n\n\n\n <ion-item-sliding *ngFor="let desc of descList">\n\n\n\n  <ion-item>\n\n    <b>Need:  </b>{{desc.record.desc}}<br>\n\n    <b>Status:  </b>{{desc.record.status}}<br>\n\n    <b>Date created:  </b>{{desc.record.dateSub}}<br>\n\n    <b>Community:  </b>{{desc.record.communityId}}\n\n<button ion-button clear item-end>\n\n<ion-icon name="arrow-forward"></ion-icon>\n\n</button>\n\n\n\n  </ion-item>\n\n\n\n  <ion-item-options>\n\n   <!--<button ion-button color="primary" (click)="editItem(desc)">Edit</button>-->\n\n   <button ion-button color="danger" (click)="removeItem(desc)"><ion-icon trash></ion-icon> Delete</button>\n\n  </ion-item-options>\n\n </ion-item-sliding>\n\n\n\n</ion-list>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\needsApp\src\pages\manageneeds\manageneeds.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], ManageneedsPage);
    return ManageneedsPage;
}());

//# sourceMappingURL=manageneeds.js.map

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageusersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase_app__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ManageusersPage = (function () {
    function ManageusersPage(navCtrl, platform, db) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.db = db;
        this.platformList = '';
        this.isApp = true;
        this.community = {};
        this.com = this.db.list('/users-list');
        var platforms = this.platform.platforms();
        this.platformList = platforms.join(', ');
        if (this.platform.is('core') || this.platform.is('mobileweb')) {
            this.isApp = false;
        }
        this.descRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref('/users-list');
        this.descRef.on('value', function (descList) {
            var descs = [];
            descList.forEach(function (desc) {
                //    descs.push(desc.val());
                var weeklyData = {};
                weeklyData["id"] = desc.key;
                weeklyData["record"] = desc.val();
                if (weeklyData["record"].type == 'A')
                    weeklyData["record"].type = 'Advocate';
                if (weeklyData["record"].type == 'N')
                    weeklyData["record"].type = 'Neighbor';
                //descs.push(desc.val()+" "+desc.key);
                descs.push(weeklyData);
                return false;
            });
            //alert(descs[0].id);
            _this.descList = descs;
            //this.loadedDescList = descs;
        });
    } //end constructor
    ManageusersPage.prototype.ionViewDidLoad = function () {
        this.userId = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"]().currentUser.uid;
    };
    ManageusersPage.prototype.removeItem = function (item) {
        //alert("delete record "+item.id);
        //delete from Firebase
        this.com.remove(item.id).then(function (_) { return console.log('deleted!'); });
        /*for(var i = 0; i < this.descList.length; i++) {
         
              if(this.descList[i] == item){
                this.descList.splice(i, 1);
              }
         
            }*/
    };
    ManageusersPage.prototype.editItem = function (item) {
        //alert("delete record "+item.id);
        //delete from Firebase
        //this.com.remove(item.id).then(_ => console.log('deleted!'));
        /*for(var i = 0; i < this.descList.length; i++) {
         
              if(this.descList[i] == item){
                this.descList.splice(i, 1);
              }
         
            }*/
    };
    ManageusersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-manageusers',template:/*ion-inline-start:"C:\needsApp\src\pages\manageusers\manageusers.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      Settings\n\n    </ion-title>\n\n\n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n<p text-center><u>Current Advocates/Neighbors</u></p>\n\n\n\n<ion-list>\n\n\n\n <ion-item-sliding *ngFor="let desc of descList">\n\n\n\n  <ion-item>\n\n   {{desc.record.fname}} {{desc.record.lname}}<br>\n\n   {{desc.record.defaultCom}}<br>\n\n   {{desc.record.cell}}<br>\n\n   Type:  {{desc.record.type}}\n\n  </ion-item>\n\n\n\n  <ion-item-options>\n\n   <!--<button ion-button color="primary" (click)="editItem(desc)">Edit</button>-->\n\n   <button ion-button color="danger" (click)="removeItem(desc)"><ion-icon trash></ion-icon> Delete</button>\n\n  </ion-item-options>\n\n </ion-item-sliding>\n\n\n\n</ion-list>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\needsApp\src\pages\manageusers\manageusers.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], ManageusersPage);
    return ManageusersPage;
}());

//# sourceMappingURL=manageusers.js.map

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Allclosed2Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Allclosed2Page = (function () {
    function Allclosed2Page(navCtrl, platform, db) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.db = db;
        this.platformList = '';
        this.isApp = true;
        this.community = {};
        this.com = this.db.list('/communities');
        var platforms = this.platform.platforms();
        this.platformList = platforms.join(', ');
        if (this.platform.is('core') || this.platform.is('mobileweb')) {
            this.isApp = false;
        }
        this.descRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref('/needs');
        this.descRef.on('value', function (descList) {
            var descs = [];
            descList.forEach(function (desc) {
                var weeklyData = {};
                weeklyData["id"] = desc.key;
                weeklyData["record"] = desc.val();
                if (weeklyData["record"].status == 'CLOSED')
                    descs.push(weeklyData);
                return false;
            });
            _this.descList = descs;
            _this.descList.sort(function (a, b) {
                // convert date object into number to resolve issue in typescript
                return +new Date(a.record.dateComp) - +new Date(b.record.dateComp);
            });
        });
    } //end constructor
    Allclosed2Page.prototype.ionViewDidLoad = function () {
        this.userId = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"]().currentUser.uid;
    };
    Allclosed2Page.prototype.onSave = function (com2) {
        //alert("in onSave and fname is "+cl2.fname+" and lname is "+cl2.lname+" and cell is "+cl2.cell+" and community is "+cl2.community);
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        today = mm + '/' + dd + '/' + yyyy;
        this.com.push({
            "name": com2.name,
            "zip": com2.zip,
            "addedBy": this.userId,
            "dateAdded": today
        });
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
    };
    Allclosed2Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-allclosed2',template:/*ion-inline-start:"C:\needsApp\src\pages\allclosed2\allclosed2.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      Historical Needs Report\n\n    </ion-title>\n\n   \n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n\n\n<br>\n\n<div text-center>Historical Needs Report</div>\n\n<br>\n\n<div text-center>\n\n<div *ngFor="let desc of descList" text-center>\n\n\n\n<ion-item><b>Need Desc:</b>  {{desc.record.desc}}<br>\n\n<b>Date Closed:</b>  {{desc.record.dateComp}}<br>\n\n<b>Community:</b>  {{desc.record.communityId}}<br>\n\n<b>Client:</b>  {{desc.record.clientId}}\n\n</ion-item>\n\n\n\n</div>\n\n</div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\needsApp\src\pages\allclosed2\allclosed2.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], Allclosed2Page);
    return Allclosed2Page;
}());

//# sourceMappingURL=allclosed2.js.map

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







//import { NotificationsPage } from './notifications';

var CreedPage = (function () {
    function CreedPage(navCtrl, platform, afA, db, http, viewCtrl) {
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.afA = afA;
        this.db = db;
        this.viewCtrl = viewCtrl;
        this.platformList = '';
        this.isApp = true;
        this.need = {};
        this.nd = this.db.list('/needs');
        this.ul = this.db.list('/users-list');
        this.data = {};
        this.http = http;
        this.userId = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid;
        this.pushPage = __WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */];
        this.section = "one";
        var platforms = this.platform.platforms();
        this.platformList = platforms.join(', ');
        if (this.platform.is('core') || this.platform.is('mobileweb')) {
            this.isApp = false;
        }
        this.groceries = [
            'Requests',
            'In Progress',
            'Work Finished'
        ];
    } //end constructor
    CreedPage.prototype.logout = function () {
        //alert("in logout");
        /*    this.afA.auth.signOut().then(() => {
               this.navCtrl.push(LoginPage);
            }) */
        this.viewCtrl.dismiss();
    };
    CreedPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-creed',template:/*ion-inline-start:"C:\needsApp\src\pages\creed\creed.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      About\n\n    </ion-title>\n\n    <ion-buttons end>\n\n        <button ion-button color="clear" (click)="logout()">Close</button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n<div text-left>\n\nThe Needs community is a group of friends who desire to love with actions and not just words.  We agree to feed the hungry, give drink to the thirsty, clothe the naked, visit the sick and imprisoned and to care for the least among us as Jesus provides.  We agree to be prayerful as we submit needs as well as resources and to give in a manner that publicly even our left hand doesn\'t know what our right hand is doing.  As needs are met in small ways and large, the community agrees to give Jesus of Nazareth alone the credit.\n\n</div>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\needsApp\src\pages\creed\creed.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_6__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* ViewController */]])
    ], CreedPage);
    return CreedPage;
}());

//# sourceMappingURL=creed.js.map

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(325);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 325:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_about_about__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_contact_contact__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_approveuser_approveuser__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_approveuseredit_approveuseredit__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_more_more__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_creed_creed__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_tabs_tabs__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_requests_requests__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_register_register__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_allopen_allopen__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_allclosed_allclosed__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_allclosed2_allclosed2__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_searchopen_searchopen__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_searchclosed_searchclosed__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_login_login__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_resetpwd_resetpwd__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_notifications_notifications__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_listcommunity_listcommunity__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_manageclients_manageclients__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_manageusers_manageusers__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_manageneeds_manageneeds__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__firebase_credentials__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_angularfire2__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29_angularfire2_auth__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__angular_http__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__ionic_native_toast__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
































var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_approveuser_approveuser__["a" /* ApproveuserPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_more_more__["a" /* MorePage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_resetpwd_resetpwd__["a" /* ResetpwdPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_listcommunity_listcommunity__["a" /* ListcommunityPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_notifications_notifications__["a" /* NotificationsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_requests_requests__["a" /* RequestsPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_allopen_allopen__["a" /* AllopenPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_searchopen_searchopen__["a" /* SearchopenPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_allclosed_allclosed__["a" /* AllclosedPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_allclosed2_allclosed2__["a" /* Allclosed2Page */],
                __WEBPACK_IMPORTED_MODULE_18__pages_searchclosed_searchclosed__["a" /* SearchclosedPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_manageclients_manageclients__["a" /* ManageclientsPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_manageneeds_manageneeds__["a" /* ManageneedsPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_manageusers_manageusers__["a" /* ManageusersPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_approveuseredit_approveuseredit__["a" /* ApproveusereditPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_creed_creed__["a" /* CreedPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_28_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_26__firebase_credentials__["a" /* FIREBASE_CONFIG */]),
                __WEBPACK_IMPORTED_MODULE_27_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_29_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_30__angular_http__["b" /* HttpModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_approveuser_approveuser__["a" /* ApproveuserPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_more_more__["a" /* MorePage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_resetpwd_resetpwd__["a" /* ResetpwdPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_listcommunity_listcommunity__["a" /* ListcommunityPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_notifications_notifications__["a" /* NotificationsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_requests_requests__["a" /* RequestsPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_allopen_allopen__["a" /* AllopenPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_searchopen_searchopen__["a" /* SearchopenPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_allclosed_allclosed__["a" /* AllclosedPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_allclosed2_allclosed2__["a" /* Allclosed2Page */],
                __WEBPACK_IMPORTED_MODULE_18__pages_searchclosed_searchclosed__["a" /* SearchclosedPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_manageclients_manageclients__["a" /* ManageclientsPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_manageneeds_manageneeds__["a" /* ManageneedsPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_manageusers_manageusers__["a" /* ManageusersPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_approveuseredit_approveuseredit__["a" /* ApproveusereditPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_creed_creed__["a" /* CreedPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_31__ionic_native_toast__["a" /* Toast */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_login_login__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MyApp = (function () {
    function MyApp() {
        /*const unsubscribe = afAuth.auth.onAuthStateChanged(user => {
              if (user) {
                this.rootPage = TabsPage;
                unsubscribe();
              } else {
                this.rootPage = LoginPage;
                unsubscribe();
              }
            });
        
            platform.ready().then(() => {
              // Okay, so the platform is ready and our plugins are available.
              // Here you can do any higher level native things you might need.
              statusBar.styleDefault();
              splashScreen.hide();
            }); */
        this.rootPage = __WEBPACK_IMPORTED_MODULE_1__pages_login_login__["a" /* LoginPage */];
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\needsApp\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\needsApp\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__requests_requests__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








//import { NotificationsPage } from './notifications';

var NotificationsPage = (function () {
    function NotificationsPage(navCtrl, platform, afA, db, http, viewCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.afA = afA;
        this.db = db;
        this.viewCtrl = viewCtrl;
        this.platformList = '';
        this.isApp = true;
        this.need = {};
        this.nd = this.db.list('/needs');
        this.ul = this.db.list('/users-list');
        this.isAdmin = false;
        this.data = {};
        this.page1 = __WEBPACK_IMPORTED_MODULE_6__requests_requests__["a" /* RequestsPage */];
        this.http = http;
        this.userId = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid;
        this.pushPage = __WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */];
        this.section = "one";
        var platforms = this.platform.platforms();
        this.platformList = platforms.join(', ');
        if (this.platform.is('core') || this.platform.is('mobileweb')) {
            this.isApp = false;
        }
        this.groceries = [
            'Requests',
            'In Progress',
            'Work Finished'
        ];
        this.userRef = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/users-list');
        this.userRef.on('value', function (descList) {
            var descs4 = '';
            var descs5 = [];
            descList.forEach(function (desc) {
                var weeklyData = {};
                weeklyData["id"] = desc.key;
                weeklyData["record"] = desc.val();
                descs5.push(weeklyData);
                //alert("this userId is "+this.userId+" and array uid is "+weeklyData["record"].uid);
                //    if (weeklyData["record"].uid == this.userId)
                descs4 = weeklyData["record"].fname + ' ' + weeklyData["record"].lname;
                //    desc4 = desc.val();
                return false;
            });
            //this.reqName = descs4;
            _this.loadedDescList = descs5;
        });
        this.descRef = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/needs');
        this.descRef.on('value', function (descList) {
            var descs = [];
            var descs2 = [];
            var descs3 = [];
            descList.forEach(function (desc) {
                //    descs.push(desc.val());
                var weeklyData = {};
                weeklyData["id"] = desc.key;
                weeklyData["record"] = desc.val();
                //descs.push(desc.val()+" "+desc.key);
                if (weeklyData["record"].status == 'Requested' && weeklyData["record"].advocate == _this.userId) {
                    descs.push(weeklyData);
                }
                if (weeklyData["record"].status == 'InProgress' && weeklyData["record"].reqBy == _this.userId) {
                    descs2.push(weeklyData);
                }
                if (weeklyData["record"].status == 'WorkCompleted' && weeklyData["record"].advocate == _this.userId) {
                    descs3.push(weeklyData);
                }
                return false;
            });
            _this.descList = descs;
            _this.descList2 = descs2;
            _this.descList3 = descs3;
        });
        if (this.descList === undefined)
            this.descList = [];
        if (this.descList2 === undefined)
            this.descList2 = [];
        if (this.descList3 === undefined)
            this.descList3 = [];
        this.descRef2 = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/users-list');
        this.descRef2.on('value', function (descList) {
            var temp = false;
            var descs5 = [];
            descList.forEach(function (desc) {
                var weeklyData = {};
                weeklyData["id"] = desc.key;
                weeklyData["record"] = desc.val();
                //alert("this userId is "+this.userId+" and array uid is "+weeklyData["record"].uid);
                if (weeklyData["record"].uid == _this.userId) {
                    descs5.push(weeklyData);
                    if (weeklyData["record"].type == 'A')
                        temp = true;
                    else
                        temp = false;
                }
                return false;
            });
            //  this.descList = descs5;
            _this.isAdmin = temp;
        });
    } //end constructor
    NotificationsPage_1 = NotificationsPage;
    NotificationsPage.prototype.ionViewDidLoad = function () {
        this.userId = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid;
    };
    NotificationsPage.prototype.editItem1 = function (item) {
        var toS;
        this.nd.update(item.id, { status: 'InProgress' });
        for (var q = 0; q < this.loadedDescList.length; q++) {
            if (item.record.reqBy == this.loadedDescList[q].record.uid) {
                toS = this.loadedDescList[q].record.cell;
                break;
            }
            //alert(this.loadedDescList[q].record.email);
        }
        //need to send text to requester who was approved and to Advocate for the Need
        var sendEmailReq = '7572865248@messaging.sprintpcs.com';
        toS = toS + '@messaging.sprintpcs.com';
        var mmsg = 'You have been assigned Need "' + item.record.desc + '"';
        mmsg = mmsg + '.  Please contact ' + item.record.advocateName + ' at ' + item.record.advocateCell + ' for more info';
        var link2 = 'https://twiliotest-ajvlzxkjds.now.sh/login';
        //alert("send to "+toS);
        //send SMS
        var link = 'https://jasongillikin.000webhostapp.com/blueEmail2.php';
        var myData;
        var message;
        myData = JSON.stringify({ emailS: 'You have been assigned Need:  "' + item.record.desc + '"', toS: toS });
        var params = new __WEBPACK_IMPORTED_MODULE_7__angular_http__["c" /* URLSearchParams */]();
        params.set('msg', mmsg);
        params.set('mto', '["1' + item.record.reqCell + '"]');
        //Http request-
        this.http.get(link2, {
            search: params
        }).subscribe(function (response) { return console.log('worked'); }, function (error) { return console.log('error'); });
        /*
          this.http.post(link,myData)
          .subscribe(data => {
          this.data.response = "OK";
          }, error => {
          console.log("oops");
          });
        */
        this.navCtrl.setRoot(NotificationsPage_1);
    };
    NotificationsPage.prototype.rejectItem1 = function (item) {
        this.nd.update(item.id, { status: 'NEW', reqBy: '', reqName: '', reqCell: '' });
        this.navCtrl.setRoot(NotificationsPage_1);
    };
    NotificationsPage.prototype.editItem2 = function (item) {
        var toS;
        //alert("item advocate uid is "+item.record.advocate);
        for (var q = 0; q < this.loadedDescList.length; q++) {
            if (item.record.advocate == this.loadedDescList[q].record.uid) {
                toS = this.loadedDescList[q].record.cell;
                break;
            }
            //alert(this.loadedDescList[q].record.email);
        }
        this.nd.update(item.id, { status: 'WorkCompleted' });
        var sendEmail = '7572865248@messaging.sprintpcs.com';
        toS = toS + '@messaging.sprintpcs.com';
        var mmsg = 'Needs work completed for Need "' + item.record.desc + '" by ' + item.record.reqName + ' (' + item.record.reqCell + ') please close it out';
        var link2 = 'https://twiliotest-ajvlzxkjds.now.sh/login';
        //send SMS
        var link = 'https://jasongillikin.000webhostapp.com/blueEmail.php';
        var myData;
        var message;
        myData = JSON.stringify({ emailS: 'Work Completed for Need:  "' + item.record.desc + '"' + ' please close it out', toS: toS });
        var params = new __WEBPACK_IMPORTED_MODULE_7__angular_http__["c" /* URLSearchParams */]();
        params.set('msg', mmsg);
        params.set('mto', '["1' + item.record.advocateCell + '"]');
        //Http request-
        this.http.get(link2, {
            search: params
        }).subscribe(function (response) { return console.log('worked'); }, function (error) { return console.log('error'); });
        /*
          this.http.post(link,myData)
          .subscribe(data => {
          this.data.response = "OK";
          }, error => {
          console.log("oops");
          });
        */
        this.navCtrl.setRoot(NotificationsPage_1);
    };
    NotificationsPage.prototype.rejectItem2 = function (item) {
        this.nd.update(item.id, { status: 'Requested' });
        this.navCtrl.setRoot(NotificationsPage_1);
    };
    NotificationsPage.prototype.editItem3 = function (item) {
        var toS;
        //alert("item advocate uid is "+item.record.advocate);
        for (var q = 0; q < this.loadedDescList.length; q++) {
            if (item.record.advocate == this.loadedDescList[q].record.uid) {
                toS = this.loadedDescList[q].record.cell;
                break;
            }
            //alert(this.loadedDescList[q].record.email);
        }
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        today = mm + '/' + dd + '/' + yyyy;
        this.nd.update(item.id, { dateComp: today });
        this.nd.update(item.id, { status: 'CLOSED' });
        var sendEmail = '7572865248@messaging.sprintpcs.com';
        toS = toS + '@messaging.sprintpcs.com';
        //alert("toS to send is "+toS);
        //send SMS
        var link = 'https://jasongillikin.000webhostapp.com/blueEmail2.php';
        var myData;
        var message;
        myData = JSON.stringify({ emailS: 'NeedsApp, status set to CLOSED for Need:  "' + item.record.desc + '"', toS: toS });
        var mmsg = 'NeedsApp, status set to CLOSED for Need:  "' + item.record.desc + '"';
        var link2 = 'https://twiliotest-ajvlzxkjds.now.sh/login';
        //send SMS
        var link = 'https://jasongillikin.000webhostapp.com/blueEmail.php';
        var myData;
        var message;
        myData = JSON.stringify({ emailS: 'Work Completed for Need:  "' + item.record.desc + '"' + ' please close it out', toS: toS });
        var params = new __WEBPACK_IMPORTED_MODULE_7__angular_http__["c" /* URLSearchParams */]();
        params.set('msg', mmsg);
        params.set('mto', '["1' + item.record.advocateCell + '"]');
        //Http request-
        this.http.get(link2, {
            search: params
        }).subscribe(function (response) { return console.log('worked'); }, function (error) { return console.log('error'); });
        /*
        //commented out since we dont need to send a text every time an Advocate closes out a Need
        
          this.http.post(link,myData)
          .subscribe(data => {
          this.data.response = "OK";
          }, error => {
          console.log("oops");
          });
        */
        this.navCtrl.setRoot(NotificationsPage_1);
    };
    NotificationsPage.prototype.rejectItem3 = function (item) {
        this.nd.update(item.id, { status: 'InProgress' });
        this.navCtrl.setRoot(NotificationsPage_1);
    };
    NotificationsPage.prototype.logout = function () {
        //alert("in logout");
        /*    this.afA.auth.signOut().then(() => {
               this.navCtrl.push(LoginPage);
            }) */
        this.viewCtrl.dismiss();
    };
    NotificationsPage = NotificationsPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-notifications',template:/*ion-inline-start:"C:\needsApp\src\pages\notifications\notifications.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      Notifications\n\n    </ion-title>\n\n    <ion-buttons end>\n\n        <button ion-button color="clear" (click)="logout()">Close</button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n<ion-toolbar>\n\n\n\n\n\n    <ion-segment [(ngModel)]="section" color="dark">\n\n\n\n\n\n      <ion-segment-button value="one">Requests\n\n<ion-badge color="accent">{{this.descList.length}}</ion-badge>\n\n              </ion-segment-button>\n\n\n\n      <ion-segment-button value="two">Progress\n\n<ion-badge color="accent">{{this.descList2.length}}</ion-badge>\n\n</ion-segment-button>\n\n\n\n\n\n      <ion-segment-button value="three">Finished\n\n<ion-badge color="accent">{{this.descList3.length}}</ion-badge>\n\n</ion-segment-button>\n\n\n\n\n\n    </ion-segment>\n\n\n\n\n\n\n\n  </ion-toolbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n\n\n\n\n <div [ngSwitch]="section">\n\n\n\n\n\n      <ion-list *ngSwitchCase="\'one\'">\n\n\n\n<br>\n\n\n\n<ion-item-sliding *ngFor="let desc of descList">\n\n\n\n <ion-item>\n\n  <b>Requested Need:</b>  {{desc.record.desc}}<br>\n\n  <b>Date Requested:</b>  {{desc.record.dateSub}} <br>\n\n  <b>Requested By:</b>  {{desc.record.reqName}} <br>\n\n  <b>Requestor Cell:</b> {{desc.record.reqCell}} <br>\n\n<button ion-button (click)="editItem1(desc)">Appprove</button>&nbsp;&nbsp;&nbsp;\n\n<button ion-button color="danger" (click)="rejectItem1(desc)">Reject</button>\n\n<button ion-button clear item-end>\n\n<ion-icon name="arrow-forward"></ion-icon>\n\n</button>\n\n\n\n </ion-item>\n\n\n\n <ion-item-options>\n\n  <button ion-button color="primary" (click)="editItem1(desc)">Approve</button>\n\n  <button ion-button color="danger" (click)="rejectItem1(desc)"><ion-icon trash></ion-icon> Reject</button>\n\n </ion-item-options>\n\n</ion-item-sliding>\n\n\n\n      </ion-list>\n\n\n\n\n\n      <ion-list *ngSwitchCase="\'two\'">\n\n\n\n        <br>\n\n\n\n        <ion-item-sliding *ngFor="let desc of descList2">\n\n\n\n         <ion-item>\n\n          <b>Requested Need:</b>  {{desc.record.desc}}<br>\n\n          <b>Date Requested:</b>  {{desc.record.dateSub}} <br>\n\n          <b>Advocate:</b>  {{desc.record.advocateName}} <br>\n\n          <b>Advocate Cell:</b> {{desc.record.advocateCell}} <br>\n\n  <button ion-button color="primary" (click)="editItem2(desc)">Finished work</button>\n\n\n\n<button ion-button clear item-end>\n\n<ion-icon name="arrow-forward"></ion-icon>\n\n</button>\n\n\n\n         </ion-item>\n\n\n\n\n\n\n\n         <ion-item-options>\n\n          <button ion-button color="primary" (click)="editItem2(desc)">Finish</button>\n\n        <!--  <button ion-button color="danger" (click)="rejectItem2(desc)"><ion-icon trash></ion-icon> Reject</button>-->\n\n         </ion-item-options>\n\n        </ion-item-sliding>\n\n\n\n      </ion-list>\n\n\n\n\n\n      <ion-list *ngSwitchCase="\'three\'">\n\n\n\n        <br>\n\n\n\n        <ion-item-sliding *ngFor="let desc of descList3">\n\n\n\n         <ion-item>\n\n          <b>Requested Need:</b>  {{desc.record.desc}}<br>\n\n          <b>Date Requested:</b>  {{desc.record.dateSub}} <br>\n\n          <b>Worked by:</b>  {{desc.record.reqName}} <br>\n\n          <b>Cell:</b> {{desc.record.reqCell}} <br>\n\n  <button ion-button color="primary" (click)="editItem3(desc)">Close</button>\n\n\n\n<button ion-button clear item-end>\n\n<ion-icon name="arrow-forward"></ion-icon>\n\n</button>\n\n\n\n         </ion-item>\n\n\n\n         <ion-item-options>\n\n          <button ion-button color="primary" (click)="editItem3(desc)">Close</button>\n\n<!--          <button ion-button color="danger" (click)="rejectItem3(desc)"><ion-icon trash></ion-icon> Reject</button>-->\n\n         </ion-item-options>\n\n        </ion-item-sliding>\n\n\n\n      </ion-list>\n\n\n\n\n\n</div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\needsApp\src\pages\notifications\notifications.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_7__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* ViewController */]])
    ], NotificationsPage);
    return NotificationsPage;
    var NotificationsPage_1;
}());

//# sourceMappingURL=notifications.js.map

/***/ }),

/***/ 469:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FIREBASE_CONFIG; });
var FIREBASE_CONFIG = {
    apiKey: "AIzaSyDofmqRFjcsQPVNbvkjqU6UexbAnqeMeD8",
    authDomain: "needs-c68d5.firebaseapp.com",
    databaseURL: "https://needs-c68d5.firebaseio.com",
    projectId: "needs-c68d5",
    storageBucket: "",
    messagingSenderId: "705063401096"
};
//# sourceMappingURL=firebase.credentials.js.map

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__resetpwd_resetpwd__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__register_register__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__tabs_tabs__ = __webpack_require__(290);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







var LoginPage = (function () {
    function LoginPage(afAuth, navCtrl, db, navParams) {
        this.afAuth = afAuth;
        this.navCtrl = navCtrl;
        this.db = db;
        this.navParams = navParams;
        this.user = {};
        this.us = this.db.list('/users-list');
    }
    LoginPage.prototype.login = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__tabs_tabs__["a" /* TabsPage */]);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.goRegister = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__register_register__["a" /* RegisterPage */]);
    };
    LoginPage.prototype.resetPwd = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__resetpwd_resetpwd__["a" /* ResetpwdPage */]);
    };
    LoginPage.prototype.register = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
                        .then(function (user) {
                        _this.us.push({
                            "email": user.email,
                            "uid": user.uid
                        });
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__tabs_tabs__["a" /* TabsPage */]);
                    })
                        .catch(function (error) { return _this.handleError(error); })];
            });
        });
    };
    // If error, console log and notify user
    LoginPage.prototype.handleError = function (error) {
        console.error(error);
        //this.notify.update(error.message, 'error');
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\needsApp\src\pages\login\login.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>The Needs App</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ion-item>\n\n    \n\n      <ion-label color="primary" stacked>Email:  </ion-label>\n\n    <ion-input type="email" [(ngModel)]="user.email"></ion-input>\n\n  </ion-item>\n\n\n\n  <ion-item>\n\n     <ion-label color="primary" stacked>Password:  </ion-label>\n\n    \n\n    <ion-input type="password" [(ngModel)]="user.password"></ion-input>\n\n  </ion-item>\n\n<br>\n\n  <button ion-button color="dark" (click)="login(user)">Login</button>\n\n  <button ion-button color="light" (click)="goRegister()">Register</button>\n\n<button ion-button color="dark" (click)="resetPwd()">\n\n    Forgot Password\n\n  </button>\n\n</ion-content>'/*ion-inline-end:"C:\needsApp\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__notifications_notifications__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__allopen_allopen__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__allclosed_allclosed__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__searchopen_searchopen__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__searchclosed_searchclosed__ = __webpack_require__(296);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var ContactPage = (function () {
    function ContactPage(navCtrl, modalCtrl, platform, db) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.platform = platform;
        this.db = db;
        this.platformList = '';
        this.isApp = true;
        this.isAdmin = false;
        this.userId = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"]().currentUser.uid;
        //alert("logged in with "+this.userId);
        this.shoppingList = [
            'All Open Needs',
            'Open Needs by Community',
            'All Closed Needs',
            'Closed Needs by Community'
        ];
        var platforms = this.platform.platforms();
        this.platformList = platforms.join(', ');
        if (this.platform.is('core') || this.platform.is('mobileweb')) {
            this.isApp = false;
        }
        this.descRef2 = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref('/users-list');
        this.descRef2.on('value', function (descList) {
            var temp = false;
            var descs5 = [];
            descList.forEach(function (desc) {
                var weeklyData = {};
                weeklyData["id"] = desc.key;
                weeklyData["record"] = desc.val();
                //alert("this userId is "+this.userId+" and array uid is "+weeklyData["record"].uid);
                if (weeklyData["record"].uid == _this.userId) {
                    descs5.push(weeklyData);
                    if (weeklyData["record"].type == 'A')
                        temp = true;
                    else
                        temp = false;
                }
                return false;
            });
            //  this.descList = descs5;
            _this.isAdmin = temp;
            _this.needRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref('/needs');
            _this.needRef.on('value', function (descList) {
                var descs2 = [];
                descList.forEach(function (desc) {
                    //    descs.push(desc.val());
                    var weeklyData = {};
                    weeklyData["id"] = desc.key;
                    weeklyData["record"] = desc.val();
                    //descs.push(desc.val()+" "+desc.key);
                    //alert(this.userId);
                    //alert("isAdmin is "+this.isAdmin);
                    if (temp) {
                        if (weeklyData["record"].status == 'Requested' && weeklyData["record"].advocate === _this.userId) {
                            // alert(weeklyData["record"].desc);
                            descs2.push(weeklyData);
                        }
                        if (weeklyData["record"].status == 'InProgress' && weeklyData["record"].reqBy === _this.userId) {
                            //    alert(weeklyData["record"].desc);
                            descs2.push(weeklyData);
                        }
                        if (weeklyData["record"].status == 'WorkCompleted' && weeklyData["record"].advocate === _this.userId) {
                            //   alert(weeklyData["record"].desc);
                            descs2.push(weeklyData);
                        }
                    }
                    else {
                        if (weeklyData["record"].status == 'InProgress' && weeklyData["record"].reqBy === _this.userId)
                            descs2.push(weeklyData);
                    }
                    return false;
                });
                //alert(descs[0].id);
                _this.needList = descs2;
                //this.loadedDescList = descs;
            });
        });
        this.descRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref('/communities');
        this.descRef.on('value', function (descList) {
            var descs = [];
            descList.forEach(function (desc) {
                //    descs.push(desc.val());
                var weeklyData = {};
                weeklyData["id"] = desc.key;
                weeklyData["record"] = desc.val();
                //descs.push(desc.val()+" "+desc.key);
                descs.push(weeklyData);
                return false;
            });
            //alert(descs[0].id);
            _this.descList = descs;
            //  this.loadedDescList = descs;
        });
        /*this.size$ = new BehaviorSubject(null);
        
        this.items$ = this.size$.switchMap(size =>
             db.list('/needs', ref =>
               status ? ref.orderByChild('dateSub').equalTo('NEW') : ref
             ).snapshotChanges()
           );
        */
        //alert("needList size is "+this.needList.length);
        if (this.needList === undefined)
            this.needList = [];
    } //end constructor
    ContactPage.prototype.ionViewDidLoad = function () {
        this.userId = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"]().currentUser.uid;
    };
    ContactPage.prototype.openModal = function () {
        var myModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__notifications_notifications__["a" /* NotificationsPage */]);
        myModal.present();
    };
    ContactPage.prototype.goNot = function () {
        //alert("in goNot");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__notifications_notifications__["a" /* NotificationsPage */]);
    };
    ContactPage.prototype.onChange = function (comId) {
        //alert("comId to search for is "+comId);
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__searchopen_searchopen__["a" /* SearchopenPage */], {
            comPassed: comId
        });
    };
    ContactPage.prototype.onChange2 = function (comId) {
        //alert("comId to search for is "+comId);
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__searchclosed_searchclosed__["a" /* SearchclosedPage */], {
            comPassed: comId
        });
    };
    ContactPage.prototype.open1 = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__allopen_allopen__["a" /* AllopenPage */]);
    };
    ContactPage.prototype.open3 = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__allclosed_allclosed__["a" /* AllclosedPage */]);
    };
    ContactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-contact',template:/*ion-inline-start:"C:\needsApp\src\pages\contact\contact.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      Find a Need\n\n    </ion-title>\n\n    <ion-buttons end>\n\n        <button id="notification-button" ion-button clear (click)="openModal()">\n\n            <ion-icon name="notifications">\n\n              <ion-badge id="notifications-badge" color="danger">{{this.needList.length}}</ion-badge>\n\n            </ion-icon>\n\n        </button>\n\n      </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n<br>\n\n<br>\n\n<table width="50%" align="center">\n\n<ion-list>\n\n<ion-item (click)="open1()">\n\nAll Open Needs\n\n</ion-item>\n\n<ion-item>\n\n                  <ion-label>Search <u>Open</u> Needs by Community</ion-label>\n\n                  <ion-select [(ngModel)]="communityId" (ionChange)="onChange(communityId)">\n\n                    <div *ngFor="let field of descList">\n\n                      <ion-option value="{{field.record.name}}">{{field.record.name}}\n\n                      </ion-option>\n\n                    </div>\n\n                  </ion-select>\n\n </ion-item>\n\n\n\n<ion-item (click)="open3()">\n\nAll Closed Needs\n\n</ion-item>\n\n<ion-item>\n\n                  <ion-label>Search <u>Closed</u> Needs by Community</ion-label>\n\n                  <ion-select [(ngModel)]="communityId" (ionChange)="onChange2(communityId)">\n\n                    <div *ngFor="let field of descList">\n\n                      <ion-option value="{{field.record.name}}">{{field.record.name}}\n\n                      </ion-option>\n\n                    </div>\n\n                  </ion-select>\n\n </ion-item>\n\n\n\n</ion-list>\n\n</table>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\needsApp\src\pages\contact\contact.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], ContactPage);
    return ContactPage;
}());

//# sourceMappingURL=contact.js.map

/***/ })

},[305]);
//# sourceMappingURL=main.js.map