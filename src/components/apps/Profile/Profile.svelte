<script lang="ts">
	import { preferences } from '🍎/state/preferences.svelte.ts';
	import BilibiliIcon from '~icons/mdi/play-box-outline';
	import InstagramIcon from '~icons/mdi/instagram';
	import TikTokIcon from '~icons/ph/tiktok-logo-fill';
	import TwitterIcon from '~icons/mdi/twitter';
	import WeiboIcon from '~icons/mdi/sina-weibo';
	import XiaohongshuIcon from '~icons/mdi/book-heart';

	const groups = [
		{
			id: 'princess',
			name: 'ニコニコ♡PRINCESS',
			joinDate: '2023年6月12日',
			memberColor: '水色',
			color: '#9edbff',
		},
		{
			id: 'cream',
			name: 'ニコニコ♡CREAM',
			joinDate: '2024年8月20日',
			memberColor: 'ミントグリーン',
			color: '#93e7c5',
		},
	] as const;

	type GroupId = (typeof groups)[number]['id'];

	let activeGroupId = $state<GroupId>('princess');
	const activeGroup = $derived(groups.find((group) => group.id === activeGroupId) ?? groups[0]);

	function external(node: HTMLAnchorElement) {
		node.rel = 'noopener noreferrer';
		node.target = '_blank';
	}
</script>

<section class="container">
	<aside class:light={preferences.theme.scheme === 'light'}>
		<div class="sidebar-profile">
			<img height="64" width="64" src="/profile/avatar.jpg" alt="宮澤葵" />
			<div>
				<strong>宮澤葵</strong>
				<span>あおぴょん</span>
			</div>
		</div>

		<nav aria-label="SNS">
			<a href="https://x.com/aoi_nicopuri" use:external> <TwitterIcon /> Twitter </a>
			<a href="https://www.instagram.com/aoi_xxk/" use:external> <InstagramIcon /> Instagram </a>
			<a href="https://www.tiktok.com/@aoi_xxk" use:external> <TikTokIcon /> TikTok </a>
			<hr />
			<a href="https://weibo.com/u/2110751371" use:external> <WeiboIcon /> 微博 </a>
			<a href="https://space.bilibili.com/1120987510" use:external> <BilibiliIcon /> 哔哩哔哩 </a>
			<a href="https://www.xiaohongshu.com/user/profile/5d04ed770000000012031c97" use:external> <XiaohongshuIcon /> 小红书 </a>
		</nav>
	</aside>

	<section class="content">
		<div class="intro">
			<h1>
				<ruby><rb>宮澤</rb><rp>（</rp><rt>みやざわ</rt><rp>）</rp></ruby>
				<ruby><rb>葵</rb><rp>（</rp><rt>あおい</rt><rp>）</rp></ruby>
			</h1>
			<p class="lead">
				宮澤葵は、日本を拠点に活動するアイドル。愛称は「あおぴょん」「小小葵」。
			</p>
			<p>
				2021年に活動を開始し、TOKYO SONIC BOOMやChummyでの活動を経て、
				現在はニコニコ♡PRINCESSとニコニコ♡CREAMのメンバーを兼任している。
			</p>
		</div>

		<div class="facts" aria-label="プロフィール">
			<div>
				<span>誕生日</span>
				<strong>2月4日</strong>
			</div>
			<div>
				<span>出身地</span>
				<strong>中国</strong>
			</div>
			<div>
				<span>血液型</span>
				<strong>A型</strong>
			</div>
			<div>
				<span>身長</span>
				<strong>160cm</strong>
			</div>
		</div>

		<div class="group-tabs">
			<div class="tab-list" role="tablist" aria-label="所属グループ">
				{#each groups as group}
					<button
						type="button"
						role="tab"
						aria-selected={activeGroupId === group.id}
						class:active={activeGroupId === group.id}
						onclick={() => (activeGroupId = group.id)}
					>
						<span style:background-color={group.color}></span>
						{group.name}
					</button>
				{/each}
			</div>

			<div class="group-panel" role="tabpanel">
				<div>
					<span>加入日</span>
					<strong>{activeGroup.joinDate}</strong>
				</div>
				<div>
					<span>メンバーカラー</span>
					<strong>
						<i style:background-color={activeGroup.color}></i>
						{activeGroup.memberColor}
					</strong>
				</div>
			</div>
		</div>
	</section>
</section>

<style>
	.container {
		--color: var(--system-color-light-hsl);
		--sidebar-width: 12.5rem;

		display: grid;
		grid-template-columns: var(--sidebar-width) minmax(0, 1fr);
		grid-template-rows: 1fr;

		overflow: hidden;

		border-radius: inherit;

		background-image: linear-gradient(
			to right,
			hsla(var(--color), 0.72) var(--sidebar-width),
			hsla(var(--color), 1) var(--sidebar-width) 100%
		);

		transition: --color 200ms ease-in;

		color: var(--system-color-dark);
	}

	aside {
		grid-area: 1 / 1 / span 1 / span 1;

		transform: translateZ(0);

		height: calc(100% - 2.7px);
		width: calc(var(--sidebar-width) - 2.27px);

		margin: 1.8px 0 0px 1.8px;
		overflow: hidden;

		border-top-left-radius: 0.5rem;
		border-bottom-left-radius: inherit;

		&::before {
			content: '';

			width: inherit;
			height: inherit;

			border-radius: inherit;

			position: fixed;
			left: 0;
			top: 0;

			z-index: -1;
			backdrop-filter: blur(12px);
		}

		&.light {
			height: calc(100% - 3px);
			width: calc(var(--sidebar-width) - 2.5px);

			margin: 1.7px 0 0px 1.7px;

			border-top-left-radius: 0.5rem;
			border-bottom-left-radius: 0.5rem;
		}

		.sidebar-profile {
			display: grid;
			grid-template-columns: 4rem minmax(0, 1fr);
			gap: 0.75rem;
			align-items: center;

			margin: 3.6rem 0.7rem 0.9rem;
			padding: 0.55rem;

			border-radius: 0.55rem;
			background-color: hsla(var(--system-color-dark-hsl), 0.09);

			img {
				height: 4rem;
				width: 4rem;
				border-radius: 2rem;
				object-fit: cover;
				box-shadow:
					inset 0 0 0 1px hsla(var(--system-color-light-hsl), 0.55),
					0 0.4rem 0.9rem hsla(var(--system-color-dark-hsl), 0.22);
			}

			div {
				display: flex;
				min-width: 0;
				flex-direction: column;
				gap: 0.18rem;
			}

			strong,
			span {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			strong {
				font-size: 0.95rem;
				font-weight: 700;
			}

			span {
				color: hsla(var(--system-color-dark-hsl), 0.66);
				font-size: 0.74rem;
			}
		}

		nav {
			display: flex;
			flex-direction: column;
			gap: 0.2rem;

			margin: 0 0.7rem;

			hr {
				display: block;

				width: 100%;
				height: 1px;

				background-color: hsla(var(--system-color-dark-hsl), 0.2);

				border: none;
			}

			a {
				display: flex;
				gap: 0.4rem;
				align-items: center;

				padding: 0.5rem;

				border-radius: 0.4rem;

				color: hsla(var(--system-color-dark-hsl), 0.9);
				font-size: 0.86rem;
				font-weight: 400;
				text-decoration: none;

				transition: background-color 100ms ease;

				:global(svg) {
					flex: 0 0 auto;
					height: 1rem;
					width: 1rem;
				}

				&:hover {
					background-color: hsla(var(--system-color-dark-hsl), 0.2);
				}
			}
		}
	}

	.content {
		grid-area: 1 / 2 / span 1 / span 1;

		display: grid;
		align-content: start;
		gap: 1rem;

		min-width: 0;
		padding: 3.4rem 1.5rem 1.4rem;
		overflow-y: auto;

		background:
			linear-gradient(
				to bottom,
				hsla(196, 35%, 14%, 0.45) 0%,
				hsla(196, 35%, 14%, 0.58) 42%,
				hsla(196, 35%, 14%, 0.82) 100%
			),
			url('/profile/background.jpg') center / cover;
		color: white;
		text-shadow: 0 1px 0.25rem hsla(200, 28%, 8%, 0.42);
	}

	.intro {
		max-width: 38rem;
	}

	.facts {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.5rem;
		max-width: 38rem;

		div {
			display: grid;
			gap: 0.25rem;

			min-height: 4.15rem;
			padding: 0.7rem 0.8rem;

			border: 1px solid hsla(0, 0%, 100%, 0.16);
			border-radius: 0.5rem;
			background-color: hsla(0, 0%, 100%, 0.14);
			backdrop-filter: blur(16px);
		}

		span {
			color: hsla(0, 0%, 100%, 0.72);
			font-size: 0.72rem;
			font-weight: 600;
		}

		strong {
			align-self: end;
			color: white;
			font-size: 0.92rem;
			font-weight: 700;
			line-height: 1.35;
		}
	}

	.group-tabs {
		display: grid;
		gap: 0.6rem;
		max-width: 38rem;
	}

	.tab-list {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.25rem;
		padding: 0.25rem;

		border: 1px solid hsla(0, 0%, 100%, 0.14);
		border-radius: 0.5rem;
		background-color: hsla(0, 0%, 100%, 0.12);
		backdrop-filter: blur(16px);

		button {
			display: flex;
			gap: 0.45rem;
			align-items: center;
			justify-content: center;

			min-width: 0;
			min-height: 2.1rem;
			padding: 0 0.7rem;

			border-radius: 0.35rem;

			color: hsla(0, 0%, 100%, 0.76);
			font-size: 0.78rem;
			font-weight: 700;
			text-shadow: inherit;

			transition:
				background-color 120ms ease,
				color 120ms ease;

			span {
				flex: 0 0 auto;
				height: 0.55rem;
				width: 0.55rem;
				border-radius: 50%;
				box-shadow: 0 0 0 1px hsla(0, 0%, 100%, 0.5);
			}

			&.active {
				background-color: hsla(0, 0%, 100%, 0.22);
				color: white;
			}

			&:hover {
				background-color: hsla(0, 0%, 100%, 0.16);
				color: white;
			}
		}
	}

	.group-panel {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.5rem;

		padding: 0.8rem;

		border: 1px solid hsla(0, 0%, 100%, 0.16);
		border-radius: 0.5rem;
		background-color: hsla(0, 0%, 100%, 0.14);
		backdrop-filter: blur(16px);

		div {
			display: grid;
			gap: 0.22rem;
			min-width: 0;
		}

		span {
			color: hsla(0, 0%, 100%, 0.72);
			font-size: 0.72rem;
			font-weight: 600;
		}

		strong {
			display: flex;
			gap: 0.45rem;
			align-items: center;

			color: white;
			font-size: 0.92rem;
			font-weight: 700;
			line-height: 1.4;
		}

		i {
			flex: 0 0 auto;
			height: 0.72rem;
			width: 0.72rem;
			border-radius: 50%;
			box-shadow: 0 0 0 1px hsla(0, 0%, 100%, 0.55);
		}
	}

	h1 {
		margin: 0;
		font-size: 3.35rem;
		line-height: 1;
	}

	p {
		margin: 0;
		max-width: 36rem;
		color: hsla(0, 0%, 100%, 0.88);
		font-size: 0.92rem;
		line-height: 1.7;
	}

	.lead {
		margin-block: 1rem 0.55rem;
		color: white;
		font-size: 1rem;
		font-weight: 600;
	}

	@media (max-width: 700px) {
		.container {
			--sidebar-width: 12.25rem;
		}

		aside {
			.sidebar-profile {
				grid-template-columns: 3.2rem minmax(0, 1fr);
				gap: 0.55rem;

				img {
					height: 3.2rem;
					width: 3.2rem;
					border-radius: 0.9rem;
				}
			}
		}

		.content {
			padding: 3.4rem 1.1rem 1.3rem;
		}

		.facts {
			grid-template-columns: 1fr;
		}

		.group-panel {
			grid-template-columns: 1fr;
		}

		h1 {
			font-size: 2.9rem;
		}
	}
</style>
