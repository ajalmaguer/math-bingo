import { Injectable } from '@angular/core';
import { multiplicationFacts } from './mathFacts'

@Injectable()
export class LocalStorageService {
	localStorageKey: string = 'mathBingoData'
	data: any = {
		bingoCard: {B: [], I:[], N: [], G: [], O: []},
		facts: this.getMathFacts(),
		pickedFacts: []
	}
	showedAlert: boolean = false

	constructor() { }
	
	resetFacts() {
		this.data.facts = this.getMathFacts()
		this.data.pickedFacts = []
	}

	pickFact() {
		if (this.data.facts.length > 0) {
			let randomIndex = Math.floor(this.data.facts.length* Math.random())
			let pickedFact = this.data.facts.splice(randomIndex, 1)[0]
			this.data.pickedFacts.push(pickedFact)
			this.saveData()
			return pickedFact
		}
	}

	getNewBingoCard() {
		this.data.bingoCard = { B: [], I: [], N: [], G: [], O: [] }
		return this.data.bingoCard
	}

	getMathFacts() {
		return JSON.parse(JSON.stringify(multiplicationFacts))
	}

	saveData() {
		this.setItem(this.localStorageKey, this.data)
	}

	loadData() {
		var localStorageData = this.getItem(this.localStorageKey)
		if (localStorageData != null) {
			this.data = localStorageData
		}
	}

	setItem(key: string, value: any) {
		if (this.isLocalStorageNameSupported()){
			window.localStorage.setItem(key, JSON.stringify(value))
		}
	}

	getItem(key: string) {
		if (this.isLocalStorageNameSupported()){
			return JSON.parse(window.localStorage.getItem(key))
		}
	}

	isLocalStorageNameSupported() {
		try 
		{
			window.localStorage.setItem('testKey', '1');
		} 
		catch (error) 
		{
			console.log(error)
			if (!this.showedAlert) {
				alert("can't store data in private mode")
				this.showedAlert = true
			}
			return false;
		}
		return true
	}
}