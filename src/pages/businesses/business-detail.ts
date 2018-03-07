import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapsService } from '../../common/services/maps.service';
import { OpenHoursService } from '../../common/services/open-hours.service';
import { BusinessesService } from '../../services/businesses.service';
import { DrupalListPage } from '../drupal/drupal-list';
import { NewsListPage } from '../news/news-list';
import { ProductsListPage } from '../products/products-list';
import { ReviewsPage } from '../reviews/reviews';
import { ServicesListPage } from '../services/services-list';
import { WordpressListPage } from '../wordpress/wordpress-list';
import { ContactUsPage } from './contact-us';
import { CatalogsListPage } from '../catalogs/catalogs-list';

import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser';

@Component({
	selector: 'page-business-detail',
	templateUrl: './business-detail.html'
})
export class BusinessDetailPage {
	options : InAppBrowserOptions = {
	    location : 'yes',//Or 'no' 
	    hidden : 'no', //Or  'yes'
	    clearcache : 'yes',
	    clearsessioncache : 'yes',
	    zoom : 'yes',//Android only ,shows browser zoom controls 
	    hardwareback : 'yes',
	    mediaPlaybackRequiresUserAction : 'no',
	    shouldPauseOnSuspend : 'no', //Android only 
	    closebuttoncaption : 'Close', //iOS only
	    disallowoverscroll : 'no', //iOS only 
	    toolbar : 'yes', //iOS only 
	    enableViewportScale : 'no', //iOS only 
	    allowInlineMediaPlayback : 'no',//iOS only 
	    presentationstyle : 'pagesheet',//iOS only 
	    fullscreen : 'yes',//Windows only    
	};
	business: any;
	tiles: any[][] = [
		[
			{ title: 'News', icon: 'at', component: NewsListPage },
			{ title: 'Products', icon: 'cart', component: ProductsListPage }
		],
		[
			{ title: 'Services', icon: 'cog', component: ServicesListPage },
			{ title: 'Catalogs', icon: 'book', component: CatalogsListPage }
		]
	];
	isOpen: boolean;

	constructor(
		public service: BusinessesService,
		private navCtrl: NavController,
		openHoursService: OpenHoursService,
		private mapsService: MapsService,
		private theInAppBrowser: InAppBrowser
	) {
		this.business = service.getCurrent();
		this.isOpen = this.business.openhours && openHoursService.isBusinessOpen(this.business.openhours);
	}

	getDirections(officeLocation: string) {
		this.mapsService.openMapsApp(officeLocation, this.business.name);
	}

	goToContactUs(business: any) {
		this.navCtrl.push(ContactUsPage, { business: business });
	}

	goToReviews() {
		this.navCtrl.push(ReviewsPage);
	}

	navigateToWordpress() {
		this.navCtrl.push(WordpressListPage);
	}

	navigateToDrupal() {
		this.navCtrl.push(DrupalListPage);
	}

	public openWithSystemBrowser(url : string){
	    let target = "_system";
	    this.theInAppBrowser.create(url,target,this.options);
	}


	callIT(passedNumber : string){
    //You can add some logic here
     document.location.href = "tel:" + passedNumber;
     // alert(passedNumber)
    }


	navigateTo(tile: any) {
		this.navCtrl.push(tile.component);
	}
}
