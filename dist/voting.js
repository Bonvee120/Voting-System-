"use strict";
const MAX_VOTES = 20;
const voterSelect = document.getElementById("voterSelect");
const candidateSelect = document.getElementById("candidateSelect");
const votingForm = document.getElementById("votingForm");
const submitVoteButton = document.getElementById("submitVoteButton");
const votingMessage = document.getElementById("votingMessage");
const candidateOneName = document.getElementById("candidateOneName");
const candidateTwoName = document.getElementById("candidateTwoName");
const candidateOneScore = document.getElementById("candidateOneScore");
const candidateTwoScore = document.getElementById("candidateTwoScore");
const totalVoteCount = document.getElementById("totalVoteCount");
const checkResultButton = document.getElementById("checkResultButton");
const dialog = document.getElementById("dialog");
const closeDialogButton = document.getElementById("closeDialogButton");
const resultContent = document.getElementById("resultContent");
// ------------------------------------
// VOTING STATE
// ------------------------------------
const votingState = {
    candidates: [
        {
            name: "Kosi",
            votes: 0,
        },
        {
            name: "Augustine",
            votes: 0,
        },
    ],
    votedVoters: new Set(),
};
// ------------------------------------
// VALIDATE REQUIRED ELEMENTS
// ------------------------------------
if (!voterSelect ||
    !candidateSelect ||
    !votingForm ||
    !submitVoteButton ||
    !votingMessage ||
    !candidateOneName ||
    !candidateTwoName ||
    !candidateOneScore ||
    !candidateTwoScore ||
    !totalVoteCount ||
    !checkResultButton ||
    !dialog ||
    !closeDialogButton ||
    !resultContent) {
    throw new Error("Voting system could not start because one or more HTML elements are missing.");
}
// ------------------------------------
// GET TOTAL VOTES
// ------------------------------------
function getTotalVotes() {
    return votingState.candidates.reduce((total, candidate) => {
        return total + candidate.votes;
    }, 0);
}
// ------------------------------------
// UPDATE LIVE SCORES
// ------------------------------------
function updateScores() {
    const firstCandidate = votingState.candidates[0];
    const secondCandidate = votingState.candidates[1];
    if (candidateOneName)
        candidateOneName.textContent = firstCandidate.name;
    if (candidateTwoName)
        candidateTwoName.textContent = secondCandidate.name;
    if (candidateOneScore)
        candidateOneScore.textContent = String(firstCandidate.votes);
    if (candidateTwoScore)
        candidateTwoScore.textContent = String(secondCandidate.votes);
    if (totalVoteCount)
        totalVoteCount.textContent = String(getTotalVotes());
}
// ------------------------------------
// DISPLAY MESSAGE
// ------------------------------------
function showMessage(message, type) {
    if (!votingMessage)
        return;
    votingMessage.textContent = message;
    if (type === "success") {
        votingMessage.className =
            "mt-4 text-center font-semibold text-green-600";
    }
    else {
        votingMessage.className =
            "mt-4 text-center font-semibold text-red-600";
    }
}
// ------------------------------------
// CHECK WHETHER VOTING HAS ENDED
// ------------------------------------
function hasVotingEnded() {
    return getTotalVotes() >= MAX_VOTES;
}
// ------------------------------------
// DISABLE VOTING
// ------------------------------------
function stopVoting() {
    if (voterSelect)
        voterSelect.disabled = true;
    if (candidateSelect)
        candidateSelect.disabled = true;
    if (submitVoteButton) {
        submitVoteButton.disabled = true;
        submitVoteButton.classList.remove("bg-blue-600", "hover:bg-blue-700");
        submitVoteButton.classList.add("bg-gray-400", "cursor-not-allowed");
    }
    showMessage("Voting has ended. The maximum of 20 votes has been reached.", "error");
}
// ------------------------------------
// SUBMIT VOTE
// ------------------------------------
function submitVote() {
    if (!voterSelect || !candidateSelect) {
        showMessage("An error occurred. Please refresh the page.", "error");
        return;
    }
    const selectedVoter = voterSelect.value;
    const selectedCandidate = candidateSelect.value;
    // Check 20-vote limit first
    if (hasVotingEnded()) {
        stopVoting();
        return;
    }
    // Check voter selection
    if (!selectedVoter) {
        showMessage("Please select your name before voting.", "error");
        return;
    }
    // Check candidate selection
    if (!selectedCandidate) {
        showMessage("Please select a candidate before submitting your vote.", "error");
        return;
    }
    // Prevent duplicate voting
    if (votingState.votedVoters.has(selectedVoter)) {
        showMessage(`${selectedVoter} has already voted. Each voter can vote only once.`, "error");
        return;
    }
    // Find selected candidate
    const candidate = votingState.candidates.find((item) => item.name === selectedCandidate);
    // Safety check
    if (!candidate) {
        showMessage("The selected candidate could not be found.", "error");
        return;
    }
    // Add voter to voted list
    votingState.votedVoters.add(selectedVoter);
    // Increase candidate score
    candidate.votes += 1;
    // Update UI immediately
    updateScores();
    // Reset selections
    voterSelect.value = "";
    candidateSelect.value = "";
    // Confirm successful vote
    showMessage(`Vote submitted successfully for ${candidate.name}.`, "success");
    // Check whether this vote reached the limit
    if (hasVotingEnded()) {
        stopVoting();
    }
}
// ------------------------------------
// CALCULATE ELECTION RESULT
// ------------------------------------
function calculateResult() {
    const firstCandidate = votingState.candidates[0];
    const secondCandidate = votingState.candidates[1];
    // No votes yet
    if (firstCandidate.votes === 0 && secondCandidate.votes === 0) {
        return `
      <div class="text-center">
        <p class="text-white">No votes have been cast yet.</p>
      </div>
    `;
    }
    // Tie
    if (firstCandidate.votes === secondCandidate.votes) {
        return `
      <div class="text-center">
        <p class="text-2xl font-bold text-yellow-400">
          IT'S A TIE
        </p>

        <p class="mt-2 text-gray-300">
          ${firstCandidate.name}: ${firstCandidate.votes} votes
        </p>

        <p class="text-gray-300">
          ${secondCandidate.name}: ${secondCandidate.votes} votes
        </p>
      </div>
    `;
    }
    // Determine winner
    const winner = firstCandidate.votes > secondCandidate.votes
        ? firstCandidate
        : secondCandidate;
    return `
    <div class="text-center">

      <p class="text-2xl font-bold text-green-400">
        ${winner.name}
      </p>

      <p class="mt-2 text-gray-300">
        is the winner with
        <span class="font-bold text-white">
          ${winner.votes} vote${winner.votes === 1 ? "" : "s"}
        </span>.
      </p>

      <div class="mt-4 text-sm text-gray-400">
        <p>
          ${firstCandidate.name}: ${firstCandidate.votes} votes
        </p>

        <p>
          ${secondCandidate.name}: ${secondCandidate.votes} votes
        </p>
      </div>

    </div>
  `;
}
// ------------------------------------
// OPEN EXISTING RESULT MODAL
// ------------------------------------
function showResult() {
    // Calculate result dynamically
    if (resultContent) {
        resultContent.innerHTML = calculateResult();
    }
    // Open the EXISTING modal
    if (dialog && !dialog.open) {
        dialog.showModal();
    }
}
// ------------------------------------
// CLOSE EXISTING RESULT MODAL
// ------------------------------------
function closeResult() {
    if (dialog && dialog.open) {
        dialog.close();
    }
}
// ------------------------------------
// FORM SUBMISSION
// ------------------------------------
votingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    submitVote();
});
// ------------------------------------
// CHECK RESULT BUTTON
// ------------------------------------
checkResultButton.addEventListener("click", () => {
    showResult();
});
// ------------------------------------
// CLOSE BUTTON
// ------------------------------------
closeDialogButton.addEventListener("click", () => {
    closeResult();
});
// ------------------------------------
// CLOSE WHEN CLICKING OUTSIDE MODAL
// ------------------------------------
dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
        closeResult();
    }
});
// ------------------------------------
// INITIAL UI
// ------------------------------------
updateScores();
//# sourceMappingURL=voting.js.map