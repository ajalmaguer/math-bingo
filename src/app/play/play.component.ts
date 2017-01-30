import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service'

@Component({
	selector: 'nom-play',
	templateUrl: './play.component.html',
	styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
	bingoCard: any
	sortedFacts: any = {}

	constructor(private dataService: LocalStorageService) { }

	ngOnInit() {
		this.sortFacts()
		this.bingoCard = this.dataService.data.bingoCard
	}

	generateCard() {
		// emptyCard
		this.bingoCard = this.dataService.getNewBingoCard()

		let sortedFactsCopy = JSON.parse(JSON.stringify(this.sortedFacts))

		for (let key in sortedFactsCopy) {
			for (let i = 0; i < 5; i++ ) {
				this.bingoCard[key].push(this.pickFact(sortedFactsCopy, key))
			}
		}
		this.dataService.saveData()
	}

	pickFact(facts, columnKey) {
		// var columnKey = columnKey
		let fact
		if (facts.hasOwnProperty(columnKey) && facts[columnKey].length > 0) {
			let randomIndex = Math.floor(facts[columnKey].length * Math.random())
			fact = facts[columnKey].splice(randomIndex, 1)[0]
		}
		return fact
	}

	sortFacts() {
		if (!this.dataService.data.facts) return false
		this.dataService.data.facts.forEach(fact => {
			let column = fact.column
			if (this.sortedFacts.hasOwnProperty(column)) {
				this.sortedFacts[column].push(fact)
			} else {
				this.sortedFacts[column] = []
				this.sortedFacts[column].push(fact)
			}
		})
	}

}
