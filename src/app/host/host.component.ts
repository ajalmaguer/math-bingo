import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service'

@Component({
	selector: 'nom-host',
	templateUrl: './host.component.html',
	styleUrls: ['./host.component.css']
})
export class HostComponent implements OnInit {
	currentFact: any

	constructor(private dataService: LocalStorageService) { }

	ngOnInit() {
	}

	getPlayUrl(forHref: boolean) {
		if (forHref) return window.location.origin + '/play'
		return window.location.host + '/play'
	}

	pick() {
		console.log('pick')
		this.currentFact = this.dataService.pickFact()
	}

	reset() {
		this.dataService.resetFacts()
	}

}
