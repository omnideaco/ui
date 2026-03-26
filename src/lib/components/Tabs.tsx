import { For, type ParentProps } from 'solid-js';
import { useTheme } from '../theme/context.js';

interface TabsProps extends ParentProps {
	items: Array<{ id: string; label: string; icon?: string }>;
	active?: string;
	onActiveChange?: (id: string) => void;
	class?: string;
}

export function Tabs(props: TabsProps) {
	const theme = useTheme();
	const isCrystal = () => theme.mode === 'crystal';

	const activeClass = () =>
		isCrystal()
			? 'text-[--color-accent] border-mix-accent-60'
			: 'text-[--color-accent] border-[--color-accent]';

	const barBorder = () =>
		isCrystal()
			? 'border-mix-on-background-12'
			: 'border-[--color-mid-gray]';

	const activeId = () => props.active ?? props.items[0]?.id ?? '';

	return (
		<div class={`flex flex-col gap-[--spacing-md] ${props.class ?? ''}`}>
			<div class={`flex gap-1 border-b ${barBorder()}`} role="tablist">
				<For each={props.items}>
					{(item) => (
						<button
							role="tab"
							aria-selected={activeId() === item.id}
							class={`px-[--spacing-md] py-[--spacing-sm] text-sm font-medium cursor-pointer transition-[color,border-color] duration-150 border-b-2 -mb-px ${activeId() === item.id ? activeClass() : 'text-[--color-secondary] border-transparent'}`}
							onClick={() => props.onActiveChange?.(item.id)}
						>
							{item.icon ? <i class={`ri-${item.icon} mr-1`} /> : null}
							{item.label}
						</button>
					)}
				</For>
			</div>

			{props.children}
		</div>
	);
}
