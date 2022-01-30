
function merge_sort(arr, left, right) {
	if(left < right - 1) {
		const mid = left + Math.floor((right - left) / 2)

		merge_sort(arr, left, mid)
		merge_sort(arr, mid, right)
		const temp = merge(arr, left, mid, right);

		for(let i = left; i < right; i++) {
			arr[i] = temp[i - left];
		}
	}
}

function merge(arr, left, mid, right) {
	let result = new Array(right - left);
	let l = left;
	let r = mid;
	let k = 0;

	while (l < mid && r < right) {
		if (arr[l] <= arr[r]) {
			result[k] = arr[l]
			l += 1
		} else {
			result[k] = arr[r]
			r += 1
		}
		k += 1
	}

	while (l < mid) {
		result[k] = arr[l];
		l += 1
		k += 1
	}

	while (r < right) {
		result[k] = arr[r];
		r += 1
		k += 1
	}

	return result;
}


const c = [4, 2, 5, 0];
merge_sort(c, 0, 4);
