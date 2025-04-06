// Track current progress and reached milestones
let currentPercentage = 0;
let reachedMilestones = new Set();

function checkProgress() {
    // Get elements
    const percentageInput = parseInt(document.getElementById("percentage").value);
    const currentPercentageDisplay = document.getElementById("current-percentage");
    const resultDiv = document.getElementById("result");

    // Clear previous result
    resultDiv.innerHTML = "";

    // Validate input
    if (isNaN(percentageInput) || percentageInput < 0 || percentageInput > 100) {
        resultDiv.innerHTML = "<p>Please enter a valid percentage (0-100)!</p>";
        return;
    }

    // Define benchmarks and their content
    const benchmarks = {
        0.1: { img: "assets/63.png", msg: "Počela si. Bravo! Ovo je početak još jednog moćnog puta za Emu. Da, neće biti lako, ali nalazili smo se u ovoj situaciji i ranije. Ema uvek prevagne!!! Tako će biti i sada, zato idemo jako!" },
        4: { msg: "Kako kida moja ljubav!" },
        9: { img: "assets/12.jpg", msg: "Znaš da si najbolja? Samo tako nastavi!" },
        12: { msg: "Buduća Ema te posmatra kroz sećanje! Bivša Ema se nada tvom uspehu!" },
        17: { msg: "Ovo je već ozbiljno! Tiiiii si nešto ozbiljno!" },
        25: { msg: "Četvrtinaaaa! Idemo Srećić!" },
        30: { img: "assets/30.jpg", msg: "E baš kidaš. Da li si znala da imaš divno cveće koje si kupila u subotu kada si sa Milošem išla na pijacu? Izdvoji 5 minuta, napravi kafu i idi da uživaš u tom cveću." },
        42: { msg: "Kidalice, kidalice, kidalice!" },
        51: { img: "assets/51.jpg", msg: "Sabila si pola, EEEEEEEJ!!! Idi kod Miloša i reci mu da mora da te poljubi u čelo! Pa šta ako spava, to nije izgovor!" },
        58: { msg: "Zvonko bi se plašio kada bi znao šta ti radiš!" },
        63: { img: "assets/63.png", msg: " " },
        70: { msg: "Legendice BREEEEEEEEEEE!" },
        85: { msg: "90%? You’re a rockstar!" },
        100: { msg: "Rešiiiiiiiiii. Zaslužila si maz. Idi kod Miloša!" }
    };

    // Get all milestone percentages and sort them
    const milestonePercentages = Object.keys(benchmarks).map(Number).sort((a, b) => a - b);

    // Find the lowest unmet milestone at or below the input percentage
    let nextMilestone = null;
    for (const milestone of milestonePercentages) {
        if (milestone <= percentageInput && !reachedMilestones.has(milestone)) {
            nextMilestone = milestone;
            break;
        }
    }

    if (nextMilestone !== null) {
        // Ask for confirmation
        if (confirm("Are you sure?")) {
            // Mark this milestone as reached
            reachedMilestones.add(nextMilestone);

            // Update current percentage to this milestone
            currentPercentage = nextMilestone;
            currentPercentageDisplay.textContent = currentPercentage;

            // Show the milestone content
            let output = "";
            if (benchmarks[nextMilestone].img) {
                output += `<img src="${benchmarks[nextMilestone].img}" alt="${nextMilestone}% image">`;
            }
            output += `<p>${benchmarks[nextMilestone].msg}</p>`;
            resultDiv.innerHTML = output;
        }
    } else {
        // Update current percentage to the input if no new milestone is reached
        currentPercentage = percentageInput;
        currentPercentageDisplay.textContent = currentPercentage;

        // Check if the input matches a milestone she already reached
        if (benchmarks[percentageInput]) {
            resultDiv.innerHTML = "<p>You've already seen this milestone! Keep going!</p>";
        } else {
            resultDiv.innerHTML = "<p>No new milestone reached—keep working!</p>";
        }
    }
}