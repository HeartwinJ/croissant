export default {
	handleDragStart(event, clickFilter, mouseMove, mouseUp) {
		event.preventDefault();
		event.stopPropagation();
		event = event || window.event;

		if (event.which == clickFilter) {
			document.onmouseup = mouseUp;
			document.onmousemove = mouseMove;
		}

		return { x: event.clientX, y: event.clientY };
	},
	handleDrag(event, target, targetPos, cursorPos) {
		event = event || window.event;
		event.preventDefault();
		event.stopPropagation();

		targetPos.x = cursorPos.x - event.clientX;
		targetPos.y = cursorPos.y - event.clientY;
		cursorPos.x = event.clientX;
		cursorPos.y = event.clientY;

		return { offsetX: target.offsetLeft - targetPos.x, offsetY: target.offsetTop - targetPos.y };
	},
	handleDragEnd(event) {
		event.preventDefault();
		event.stopPropagation();
		document.onmouseup = null;
		document.onmousemove = null;
	},
	handleScale(event, target, scale) {
		let _scale = scale;
		if (event.ctrlKey) {
			event.preventDefault();
			event.stopPropagation();
			if (event.deltaY > 0) {
				_scale = scale - 0.1;
				if (_scale < 0.5) _scale = 0.5;
			} else {
				_scale = scale + 0.1;
				if (_scale > 2) _scale = 2;
			}
			target.style.transform = `scale(${_scale})`;
		}
		return _scale;
	},
	handleResize(event, targetSize, cursorPos) {
		event = event || window.event;
		event.preventDefault();
		event.stopPropagation();
		return {
			width: targetSize.width + (event.clientX - cursorPos.x),
			height: targetSize.height + (event.clientY - cursorPos.y)
		};
	},
	handleMouseMove(event) {
		event.preventDefault();
		return { x: event.clientX, y: event.clientY };
	},
	async handlePaste(event, callback) {
		event.preventDefault();
		event.stopPropagation();
		const clipboardData = event.clipboardData || event.originalEvent.clipboardData;

		let data = clipboardData.getData("text");
		if (!data) {
			const items = clipboardData.items;
			for (const item of items) {
				if (item.kind === "file") {
					data = await new Promise((resolve) => {
						const blob = item.getAsFile();
						const reader = new FileReader();
						reader.onload = () => resolve(reader.result);
						reader.readAsDataURL(blob);
					});
				}
			}
		}

		callback(data);
	}
};
