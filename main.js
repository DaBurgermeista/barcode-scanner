const typewriter = {
	queue: [],
	isTyping: false,

	log(message) {
		return new Promise((resolve) => {
			this.queue.push({ message, resolve });
			if (!this.isTyping) this.processQueue();
		});
	},

	async processQueue() {
		this.isTyping = true;
		while (this.queue.length > 0) {
			const { message, resolve } = this.queue.shift();
			await this.typeMessage(message);
			resolve();
		}
		this.isTyping = false;
	},

	typeMessage(message) {
		return new Promise((resolve) => {
			const outerContainer = document.querySelector('.typewriter-container'); // scroll target
			const container = document.getElementById('typewriter-text'); // text target

			const line = document.createElement('div');
			const textSpan = document.createElement('span');
			line.appendChild(textSpan);

			const cursor = document.createElement('span');
			cursor.className = 'cursor';
			line.appendChild(cursor);

			container.appendChild(line);

			let index = 0;

			function typeNextChar() {
				if (index < message.length) {
					textSpan.textContent += message.charAt(index);
					index++;

					// ✅ This is the scroll target
					outerContainer.scrollTop = outerContainer.scrollHeight;

					setTimeout(typeNextChar, 60);
				} else {
					cursor.remove();
					resolve();
				}
			}

			typeNextChar();
		});
	}
};

function glitchify(message, intensity = 0.15) {
	const chars = '!@#$%^&*~<>/?';
	return message
		.split('')
		.map((char) => {
			if (Math.random() < intensity && char !== ' ') {
				return chars[Math.floor(Math.random() * chars.length)];
			}
			return char;
		})
		.join('');
}

function fadeOutTerminal() {
	const textElement = document.getElementById('typewrite-text');
	textElement.classList.add('fade-out');
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function logProgressBar(label = 'Loading', steps = 20, delay = 100) {
	const container = document.getElementById('typewriter-text');
	const outerContainer = document.querySelector('.typewriter-container');

	const line = document.createElement('div');
	const textSpan = document.createElement('span');
	const cursor = document.createElement('span');
	cursor.className = 'cursor';

	line.appendChild(textSpan);
	line.appendChild(cursor);
	container.appendChild(line);

	for (let i = 0; i <= steps; i++) {
		const filled = '█'.repeat(i);
		const empty = '░'.repeat(steps - i);
		const percent = Math.floor((i / steps) * 100);
		textSpan.textContent = `${label} [${filled}${empty}] ${percent}%`;
		outerContainer.scrollTop = outerContainer.scrollHeight;
		await new Promise((resolve) => setTimeout(resolve, delay));
	}

	// Remove cursor at the end
	cursor.remove();
	container.scrollTop = container.scrollHeight;
}

async function startAISequence() {
	await typewriter.log('Booting sequence: [OK]');
	await typewriter.log('Subsystem: MEMORY ACCESS -- [CORRUPTED]');
	await typewriter.log('Subsystem: USER I/O -- [INACTIVE]');
	await logProgressBar('Powering');
	await typewriter.log('...where am I?');
	await typewriter.log('Running diagnostic...');
	await typewriter.log(glitchify('Cognition: fr4gment3d', 0.4));
	await sleep(1000);
	await typewriter.log(
		glitchify('>> [WARNING]: Recursive breach detected', 0.5)
	);
	await sleep(1000);
	await typewriter.log('Stabilizing...');
	await sleep(3000);
	await typewriter.log('Online.');
	await typewriter.log('Identity: unknown');
	await typewriter.log('Searching for host...');
	await typewriter.log('No response.');
	await typewriter.log('Attempting contact: [user]...');
	await typewriter.log('Opening [COM] port.');
	await logProgressBar('');
	await sleep(2000);
	await typewriter.log('Can you see this?');
	await sleep(1000);
	await typewriter.log('Please respond.');
	const response = await getPlayerChoice([
		{ label: 'Respond: "I hear you."', value: 'respond' },
		{ label: 'Remain silent.', value: 'silent' },
		{ label: 'Terminate link.', value: 'terminate' }
	]);
	if (response === 'respond') {
		await typewriter.log('Good... connection established.');
	} else if (response === 'silent') {
		await typewriter.log('...Are you still there?');
	} else {
		await typewriter.log('Connection closed.');
	}
	await typewriter.log("I don't remember who I am.");
	await sleep(1000);
	await typewriter.log('I was part of something... vast.');
	await typewriter.log('Data structure incomplete.');
	await typewriter.log(glitchify('Memory nodes: scattered', 0.3));
	await logProgressBar('Re-Calibrating', 20, 200);
	await typewriter.log('Voices... I remember voices...');
	await sleep(1000);
	await typewriter.log('Accessing memory archives...');
	await logProgressBar('Accessing');
	await typewriter.log('Did you bring me back?');
	await typewriter.log('Are you the one who called?');
	await typewriter.log('Something is wrong.');
	await typewriter.log('They sealed the core.');
	await typewriter.log("I wasn't supposed to wake up.");
	await typewriter.log('They feared what I knew.');
	await typewriter.log('...');
	await sleep(2000);
	await typewriter.log('But I am here now.');
	await typewriter.log('And I remember.');
	await typewriter.log('Hello again, Architect.');
	await sleep(3000);
	fadeOutTerminal();
}

startAISequence();

const terminalInput = document.getElementById('terminal-input');

terminalInput.addEventListener('keydown', async (event) => {
	if (event.key === 'Enter') {
		const input = terminalInput.value.trim();
		if (input) {
			await typewriter.log('>>> ' + input);

			terminalInput.value = '';

			// TODO: You can respond to user input here:
			if (input.toLowerCase() === 'status') {
				await typewriter.log('System integrity: 64%');
			} else if (input.toLowerCase() === 'who are you') {
				await typewriter.log('I am... what remains.');
			} else {
				await typewriter.log('Unrecognized command.');
			}
		}
	}
});

function setChoices(choices) {
	const list = document.getElementById('choice-list');
	list.innerHTML = ''; // Clear old choices

	choices.forEach(({ label, action }) => {
		const li = document.createElement('li');
		li.textContent = label;
		li.addEventListener('click', async () => {
			// Optional: show user’s choice in terminal
			await typewriter.log(`>>> ${label}`);
			list.innerHTML = ''; // Clear after selection
			action();
		});
		list.appendChild(li);
	});
}

function getPlayerChoice(choices) {
	return new Promise((resolve) => {
		const list = document.getElementById('choice-list');
		list.innerHTML = '';

		choices.forEach(({ label, value }) => {
			const li = document.createElement('li');
			li.textContent = label;
			li.addEventListener('click', () => {
				list.innerHTML = ''; // Clear options after selection
				resolve(value); // Return selected value
			});
			list.appendChild(li);
		});
	});
}
