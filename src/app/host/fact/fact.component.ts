import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'mb-fact',
	templateUrl: './fact.component.html',
	styleUrls: ['./fact.component.css']
})
export class FactComponent implements OnInit {
	@Input() fact
	@Input() column
	
	constructor() { }

	ngOnInit() {
	}

}
