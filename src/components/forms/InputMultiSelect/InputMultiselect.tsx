import { CustomBadge } from '@components/Badge/CustomBadge';
import { useCallback, useRef, useState } from 'react';
import { Controller, type Control } from 'react-hook-form';

interface Option {
	value: string;
	label: string;
}

interface Props {
	label: string;
	control: Control<any>;
	name: string;
	options: Option[];
	placeholder?: string;
}

export const InputMultiselect = ({
	control,
	label,
	name,
	options,
	placeholder,
}: Props) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [inputValue, setInputValue] = useState('');

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={[]}
			render={({ field }) => {
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

				return (
					<div className='flex flex-col gap-2 relative w-full'>
						{label && <label className='font-medium text-white'>{label}</label>}

						<div className='flex flex-wrap gap-2 border-white border p-2 rounded-md items-center'>
							{selected.map((opt) => (
								<CustomBadge
									name={opt.label}
									key={opt.value}>
									<button onClick={() => handleUnselect(opt)}>x</button>
								</CustomBadge>
							))}

							<input
								type='text'
								ref={inputRef}
								placeholder={placeholder}
								className='outline-none bg-transparent text-white flex-1 min-w-[120px]'
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								onKeyDown={handleKeyDown}
							/>
						</div>

						{inputValue && (
							<div className='bg-gray-900 border border-white rounded-md absolute top-full left-0 right-0 mt-1 z-10'>
								{selectables.length > 0 ? (
									selectables.map((opt) => (
										<div
											key={opt.value}
											onClick={() => handleSelect(opt)}
											className='p-2 hover:bg-gray-700 cursor-pointer first:rounded-t-md last:rounded-b-md text-left'>
											{opt.label}
										</div>
									))
								) : (
									<div className='p-2 text-gray-400 text-sm'>
										Presiona Enter para crear "{inputValue}"
									</div>
								)}
							</div>
						)}
					</div>
				);
			}}
		/>
	);
};
