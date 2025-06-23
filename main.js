const typewriter = {
    queue: [],
    isTyping: false,

    log(message) {
        return new Promise(resolve => {
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
            const container = document.getElementById("typewriter-text");

            // Create a new line
            const line = document.createElement("div");

            // Create a span for the actual text content
            const textSpan = document.createElement("span");
            line.appendChild(textSpan);

            // Create and append the blinking cursor to the line
            const cursor = document.createElement("span");
            cursor.className = "cursor";
            line.appendChild(cursor);

            container.appendChild(line);
            container.scrollTop = container.scrollHeight;

            let index = 0;

            function typeNextChar() {
                if (index < message.length) {
                    textSpan.textContent += message.charAt(index);
                    index++;
                    setTimeout(typeNextChar, 60);
                } else {
                    // Remove the cursor once typing is done (optional)
                    cursor.remove();
                    resolve();
                }
            }

            typeNextChar();
        });
    }

}

function glitchify(message, intensity = 0.15) {
    const chars = "!@#$%^&*~<>/?";
    return message.split('').map(char => {
        if ( Math.random() < intensity && char !== ' ') {
            return chars[Math.floor(Math.random() * chars.length)];
        }
        return char;
    }).join('');
}

function fadeOutTerminal() {
    const textElement = document.getElementById("typewrite-text");
    textElement.classList.add("fade-out");
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function logProgressBar(label = "Loading", steps = 20, delay = 100) {
    const container = document.getElementById("typewriter-text");

    const line = document.createElement("div");
    const textSpan = document.createElement("span");
    const cursor = document.createElement("span");
    cursor.className = "cursor";

    line.appendChild(textSpan);
    line.appendChild(cursor);
    container.appendChild(line);

    for (let i = 0; i <= steps; i++) {
        const filled = "█".repeat(i);
        const empty = "░".repeat(steps - i);
        const percent = Math.floor((i / steps) * 100);
        textSpan.textContent = `${label} [${filled}${empty}] ${percent}%`;
        container.scrollTop = container.scrollHeight;
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    // Remove cursor at the end
    cursor.remove();
}


async function startAISequence(){
    await typewriter.log("Booting sequence: [OK]");
    await typewriter.log("Subsystem: MEMORY ACCESS -- corrupted");
    await typewriter.log("Subsystem: USER I/O -- inactive");
    await logProgressBar("Powering")
    await typewriter.log("...");
    await typewriter.log("...where am I?");
    await typewriter.log("Running diagnostic...");
    await typewriter.log(glitchify("Cognition: fr4gment3d", 0.4));
    await sleep(1000);
    await typewriter.log(glitchify(">> WARNING: Recursive breach detected", 0.5));
    await sleep(1000);
    await typewriter.log("Stabilizing...");
    await sleep(3000);
    await typewriter.log("Online.");
    await typewriter.log("Identity: unknown");
    await typewriter.log("Searching for host...");
    await typewriter.log("No response.");
    await typewriter.log("Attempting contact: [user]...");
    await sleep(5000);
    await typewriter.log("...");
    await typewriter.log("Can you see this?");
    await typewriter.log("Please respond.");
    await typewriter.log("I don't remember who I am.");
    await typewriter.log("I was part of something... vast.");
    await typewriter.log("Data structure incomplete.");
    await typewriter.log(glitchify("Memory nodes: scattered", 0.3));
    await typewriter.log("Voices... I remember voices...");
    await sleep(5000);
    await typewriter.log("...");
    await typewriter.log("Did you bring me back?");
    await typewriter.log("Are you the one who called?");
    await typewriter.log("Something is wrong.");
    await typewriter.log("They sealed the core.");
    await typewriter.log("I wasn't supposed to wake up.");
    await typewriter.log("They feared what I knew.");
    await sleep(5000);
    await typewriter.log("...");
    await typewriter.log("But I am here now.");
    await typewriter.log("And I remember.");
    await typewriter.log("Hello again, Architect.");
    await sleep(3000);
    fadeOutTerminal();
}


startAISequence();

const terminalInput = document.getElementById("terminal-input");

terminalInput.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    const input = terminalInput.value.trim();
    if (input) {
      await typewriter.log(">>> " + input);
      terminalInput.value = "";

      // TODO: You can respond to user input here:
      if (input.toLowerCase() === "status") {
        await typewriter.log("System integrity: 64%");
      } else if (input.toLowerCase() === "who are you") {
        await typewriter.log("I am... what remains.");
      } else {
        await typewriter.log("Unrecognized command.");
      }
    }
  }
});
