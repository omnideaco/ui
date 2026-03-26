import { createSignal, For, Show, mergeProps, type JSX } from 'solid-js';
import { useTheme } from '../theme/context.js';

interface AccordionItem {
	id: string;
	title: string;
	content: () => JSX.Element;
	icon?: string;
}

interface AccordionProps {
	items: AccordionItem[];
	multiple?: boolean;
	class?: string;
}

export function Accordion(props: AccordionProps) {
	const merged = mergeProps({ multiple: false }, props);

	const theme = useTheme();
	const isCrystal = () => theme.mode === 'crystal';

	const [openIds, setOpenIds] = createSignal<Set<string>>(new Set());

	function toggle(id: string) {
		setOpenIds((prev) => {
			const next = new Set(prev);
			if (next.has(id)) {
				next.delete(id);
			} else {
				if (merged.multiple) {
					next.add(id);
				} else {
					return new Set([id]);
				}
			}
			return next;
		});
	}

	const containerBorder = () =>
		isCrystal()
			? 'border-mix-on-background-12'
			: 'border-mix-on-background-8';

	const headerBg = () =>
		isCrystal()
			? 'bg-mix-surface-50'
			: 'bg-[--color-surface]';

	const contentBg = () =>
		isCrystal()
			? 'bg-mix-background-40'
			: 'bg-[--color-background]';

	const dividerBorder = () =>
		isCrystal()
			? 'border-mix-on-background-10'
			: 'border-[--color-mid-gray]';

	return (
		<div class={`flex flex-col rounded-[--radius-lg] border ${containerBorder()} overflow-hidden ${merged.class ?? ''}`}>
			<For each={merged.items}>
				{(item, i) => (
					<>
						<Show when={i() > 0}>
							<div class={`border-t ${dividerBorder()}`} />
						</Show>

						<div>
							<button
								class={`w-full px-[--spacing-lg] py-[--spacing-md] flex items-center justify-between ${headerBg()} text-[--color-on-background] text-sm font-medium cursor-pointer transition-[background] duration-150`}
								onClick={() => toggle(item.id)}
								aria-expanded={openIds().has(item.id)}
							>
								<span class="flex items-center gap-[--spacing-sm]">
									{item.icon ? <i class={`ri-${item.icon}`} /> : null}
									{item.title}
								</span>
								<i class={`ri-arrow-down-s-line text-[--color-secondary] text-xs transition-transform duration-200 ${openIds().has(item.id) ? 'rotate-180' : ''}`} />
							</button>

							<Show when={openIds().has(item.id)}>
								<div class={`px-[--spacing-lg] py-[--spacing-md] ${contentBg()} text-sm`}>
									{item.content()}
								</div>
							</Show>
						</div>
					</>
				)}
			</For>
		</div>
	);
}
