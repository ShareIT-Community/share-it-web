import { useCallback } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';

interface Option {
	value: string;
	label: string;
}

interface Props {
	options: Option[];
	field: ControllerRenderProps<any, string>;
	inputValue: string;
	setInputValue: (value: string) => void;
}

export const useMultiselect = ({
	options,
	field,
	inputValue,
	setInputValue,
}: Props) => {
	const selected: Option[] = field.value || [];

	const handleUnselect = useCallback(
		(option: Option) => {
			field.onChange(selected.filter((s) => s.value !== option.value));
		},
		[field, selected],
	);

	const handleSelect = (option: Option) => {
		if (!selected.some((s) => s.value === option.value)) {
			field.onChange([...selected, option]);
		}
		setInputValue('');
	};

	const selectables = options.filter(
		(opt) =>
			!selected.some((s) => s.value === opt.value) &&
			opt.label.toLowerCase().includes(inputValue.toLowerCase()),
	);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key !== 'Enter') return;
		e.preventDefault();

		if (!inputValue.trim()) return;

		if (selectables.length === 0) {
			handleSelect({
				value: inputValue.toLowerCase(),
				label: inputValue,
			});
			return;
		}

		handleSelect(selectables[0]);
	};

	return {
		selected,
		handleUnselect,
		handleSelect,
		selectables,
		handleKeyDown,
	};
};
