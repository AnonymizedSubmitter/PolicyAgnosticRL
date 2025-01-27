document.addEventListener("DOMContentLoaded", function () {
	const lazyVideos = document.querySelectorAll("video[data-src]");

	const lazyLoad = (entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const video = entry.target;
				video.src = video.dataset.src;
				video.load();

				video.querySelectorAll("source").forEach((source) => {
					source.src = source.dataset.src;
				});

				observer.unobserve(video);
			}
		});
	};

	const observer = new IntersectionObserver(lazyLoad, {
		threshold: 0.25, // Trigger loading when 25% of the video is visible
	});

	lazyVideos.forEach((video) => observer.observe(video));
});

// Hidden tabs functionality
// Get all tab buttons and tab content elements
const tabButtons = document.querySelectorAll("[data-tabs-target]");
const tabContents = document.querySelectorAll("#eval_tab_contents > div");

// Add click event listeners to the tab buttons
tabButtons.forEach((tabButton) => {
	tabButton.addEventListener("click", () => {
		// Remove the 'active-tab' class from all buttons
		tabButtons.forEach((button) =>
			button.classList.add(
				"border-transparent",
				"text-gray-400",
				"hover:text-gray-600",
				"hover:border-gray-300",
				"dark:hover:text-gray-300",
			),
		);
		tabButtons.forEach((button) => button.classList.remove("text-gray-900"));

		// Add the 'active-tab' class to the clicked button
		tabButton.classList.remove(
			"border-transparent",
			"text-gray-400",
			"hover:text-gray-600",
			"hover:border-gray-300",
			"dark:hover:text-gray-300",
		);
		tabButton.classList.add("text-gray-900");

		// Hide all tab contents
		tabContents.forEach((content) => content.classList.add("hidden"));

		// Show the corresponding tab content
		const targetId = tabButton.getAttribute("data-tabs-target");
		const targetContent = document.querySelector(targetId);
		targetContent.classList.remove("hidden");
	});
});

document.addEventListener("DOMContentLoaded", () => {
	const footnotes = document.querySelectorAll(".footnote");

	footnotes.forEach((footnote) => {
		footnote.addEventListener("mouseenter", (event) => {
			const tooltip = event.target.querySelector("::after");
			positionTooltip(event.target, tooltip);
		});
	});

	function positionTooltip(trigger, tooltip) {
		// Remove any previous positioning
		trigger.style.removeProperty("--tooltip-transform");
		trigger.style.removeProperty("--tooltip-left");

		// Get trigger and viewport dimensions
		const triggerRect = trigger.getBoundingClientRect();
		const viewportWidth = window.innerWidth;

		// Calculate tooltip width and position
		const tooltipWidth = 320; // Based on w-80 in Tailwind (which is 20rem or 320px)
		const tooltipLeft =
			triggerRect.left + triggerRect.width / 2 - tooltipWidth / 2;

		// Check left overflow
		if (tooltipLeft < 10) {
			trigger.style.setProperty(
				"--tooltip-transform",
				"translateX(calc(50% - " + (tooltipLeft - 10) + "px))",
			);
			trigger.style.setProperty("--tooltip-left", "10px");
		}

		// Check right overflow
		const rightEdge = tooltipLeft + tooltipWidth;
		if (rightEdge > viewportWidth - 10) {
			const overflowAmount = rightEdge - (viewportWidth - 10);
			trigger.style.setProperty(
				"--tooltip-transform",
				"translateX(calc(50% - " + overflowAmount + "px))",
			);
			trigger.style.setProperty("--tooltip-left", "auto");
			trigger.style.setProperty("--tooltip-right", "10px");
		}
	}
});
