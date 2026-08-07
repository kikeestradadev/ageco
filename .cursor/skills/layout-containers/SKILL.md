---
name: layout-containers
description: >-
    Enforce module shell: section with Main Container (--main-container) then
    Container (--container). Outer uses w-full, max-w-[var(--main-container)],
    mx-auto, px-[15px] only. Inner has no side padding. Vertical rhythm comes from
    main gap-[var(--section-gap)] and main pb-[var(--section-gap)] — never py/pt/pb
    on section shells. Use when creating or editing Pug/HTML modules, sections,
    template main, or storybook components.
---

# Layout Containers

## Tokens (`src/styles/styles.css` `:root`)

- `--main-container: 3500px` — outer `section`
- `--container: 1600px` — inner content wrapper
- `--section-gap: 2.5rem` (desktop `4rem`) — space **between** sections (`gap` on `main`) **and** space after the last section (`pb` on `main`)

## Module shell (required)

```pug
section.mx-auto.w-full(class='max-w-[var(--main-container)] px-[15px]')
	.mx-auto.w-full(class='max-w-[var(--container)]')
		//- module content
```

| Layer       | Classes                                                    |
| ----------- | ---------------------------------------------------------- |
| `section`   | `w-full max-w-[var(--main-container)] mx-auto px-[15px]`   |
| inner `div` | `w-full max-w-[var(--container)] mx-auto` (no `px-[15px]`) |

## Vertical spacing (`main`)

`main` owns both the inter-section gap and the bottom breathing room before the footer:

```pug
main.flex.w-full.flex-1.flex-col(
	class='max-w-[var(--main-container)] gap-[var(--section-gap)] pb-[var(--section-gap)]'
)
```

| On `main` | Role |
|-----------|------|
| `gap-[var(--section-gap)]` | Distance between sibling sections |
| `pb-[var(--section-gap)]` | Distance between the **last** section and the footer |

Do **not** add `py-*`, `pt-*`, or `pb-*` on module `section` shells. Do **not** omit `pb-[var(--section-gap)]` on `main` (gap alone does not space after the last child).

## Never

- `max-w-[3500px]` / `max-w-[1600px]`
- `px-[15px]` on the inner container
- `py-10` (or any vertical padding) on the outer `section`
- Outer shell that is not a `section` for page modules
- `main` with only `gap-[var(--section-gap)]` and no `pb-[var(--section-gap)]`

## Checklist

1. Root tag is `section`.
2. Outer: main-container token + lateral `px-[15px]` only.
3. Inner: container token, no side padding.
4. No vertical padding on the section; rely on `--section-gap` via `main`.
5. `main` in `template.pug` has both `gap-[var(--section-gap)]` and `pb-[var(--section-gap)]`.
6. Tokens exist in `:root`; tune spacing by editing `--section-gap`.
