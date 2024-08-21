const debounce = (func, wait) => {
	let timeout
	return function (...args) {
		const later = () => {
			clearTimeout(timeout)
			func.apply(this, args)
		}
		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
	}
}

const handleWheel = useCallback(
	debounce(event => {
		if (scrollRef.current) {
			scrollRef.current.scrollLeft += event.deltaY * 3
		}
	}, 1000),
	[]
)

const onWheel = event => {
	event.preventDefault() // Prevent default vertical scrolling behavior
	handleWheel(event) // Call the debounced function
}
