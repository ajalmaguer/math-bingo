import { Injectable } from '@angular/core';
import { multiplicationFacts } from './mathFacts'

@Injectable()
export class LocalStorageService {
	data: any = {
		bingoCard: {B: [], I:[], N: [], G: [], O: []},
		facts: multiplicationFacts,
		pickedFacts: []
	}
	showedAlert: boolean = false

	constructor() { }
	
	resetFacts() {
		this.data.facts = JSON.parse(JSON.stringify(multiplicationFacts)) 
		this.data.pickedFacts = []
	}

	pickFact() {
		let randomIndex = Math.floor(this.data.facts.length* Math.random())
		let pickedFact = this.data.facts.splice(randomIndex, 1)
		this.data.pickedFacts.push(pickedFact)
		this.saveData()
		return pickedFact
	}

	getNewBingoCard() {
		this.data.bingoCard = { B: [], I: [], N: [], G: [], O: [] }
		return this.data.bingoCard
	}

	saveData() {
		this.setItem('data', this.data)
	}

	loadData() {
		var localStorageData = this.getItem('data')
		// console.log('localStorageData =', localStorageData)
		if (localStorageData != null) {
			this.data = localStorageData
		}
		// console.log('this.data=', this.data)
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