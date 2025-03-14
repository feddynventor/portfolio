import { ParagraphType } from "./paragraph";

type Button = {title: string, caption: string, tech_stack: string[], link?: string}
const button_list = (contents: Button[]): HTMLDivElement => {
    const buttons = document.createElement('div');
    buttons.className = 'buttons-group';

    contents.forEach( (content: Button) => {
        const button = document.createElement('div');
        button.className = 'button';
        button.innerHTML = `<b>${content.title}</b><p>${content.caption}</p><ul>${content.tech_stack.map( el => `<li>${el}</li>` ).join("")}</ul>`;
        button.onclick = () => window.open( (!!content.link ? content.link : "https://github.com/feddynventor/".concat(content.title)), '_blank');

        buttons.appendChild(button)
    });

    return buttons;
}
// 16:9 videos only
// see paragraph.ts:38
const video = (src: string, caption?: string): HTMLDivElement => {
    const el = document.createElement('div') as HTMLDivElement;
    el.classList.add("video")
    const spinner = document.createElement('div') as HTMLDivElement;
    spinner.classList.add("spinner")
    const description = document.createElement('p') as HTMLParagraphElement;
    description.innerHTML = caption || "Loading video...";
    const vid = document.createElement('video') as HTMLVideoElement;
    vid.muted = true
    vid.loop = true
    vid.autoplay = true
    vid.setAttribute("src", src)
    vid.setAttribute("aria-label", caption || "Some DEMO videos! yum")
    el.appendChild(description)
    el.appendChild(spinner)
    el.appendChild(vid)
    return el
}

export default [{
    title: '$( whoami )',
    content: [
        "it's me, <hl>Fedele</hl> &#x1F607; enthusiastic about <b>connecting</b> people &#x1F49A; souls and servers &#x1F30D; on the <b>cloud</b> and onpremises &#x1F4BB;",
        "willing to help &#x1F44B; I'm a <hl>team player</hl> who enjoys working with <b>people</b> and <b>mentoring</b> ~ inspired by whose willing to learn",
        "willing to leap &#x1F680; I'm a <hl>learner</hl> always looking for new <b>challenges</b> and <b>skills</b> to acquire",
        // new Carousel(["app/assets/images/me.jpg","app/assets/images/me.png","app/assets/images/me2.jpg","app/assets/images/me30.png","app/assets/images/me4.jpg"],192,1200).start() as HTMLDivElement,
    ],
},{
    title: 'what I do &#x1F527;',
    content: [
        "I'm a <b>software engineer</b> with a strong focus on <b>simplicity</b> ~ conquering <hl>low-level understanding</hl> of frameworks, networks and operating systems",
        "I'm a <hl>Broadcasting enthusiast!</hl> &#x1F4FA; dealing with <b>critical infrastructure</b>; system design is my bread &#x1F35E;",
        "Travelling frees my <b>spirit</b> &#x1F1EE;&#x1F1E9; &#x1F1F2;&#x1F1E6; &#x1F1E9;&#x1F1EA; &#x1F1EA;&#x1F1F8; &#x1F1F3;&#x1F1F1; &#x1F1EC;&#x1F1E7;",
        "I've streamlined processes at <b><a href='https://telesveva.it'>Telesveva</a></b> with a <hl>custom-made framework for CMS</hl> with typescript and htmx",
    ],
},{
    title: 'my work &#x1F529;',
    content: [
        "Following some <hl> demo videos! </hl> &#x1F3A5;",
        "<hl>Hybrid Broadcasting</hl> via web technologies. Here I've mastered transpilation and <hl>Node.js toolchains</hl>, transpiling TypeScript to ES5 as HbbTV standard",
        "On the backend I've integrated <hl>new production processes</hl> so to deploy a custom CDN and content management",
        video('app/assets/videos/telesveva.webm'),
        "I've realized a <hl>video playout</hl> system for a <b>local broadcaster</b> <a href='https://news24.city'>news24.city</a>",
        "What you see is a Chromium instance playing <b>queues of content</b>. The schedule logic is remotely managed from a CMS which is <hl>designed to guarantee consistency</hl>. I call it stateful-heaven",
        video('app/assets/videos/news24.webm'),
        "This is the CMS, capable of maitaining <hl>stateful connection</hl> with the playout on one side and <b>many external content sources</b>. Statefulness is made easier through htmx which replicates the <hl>server state</hl> via <hl>frontend templating</hl>",
        video('app/assets/videos/cms.webm'),
    ]
},{
    title: 'stop abstracting &#x1F3A8;',
    content: [
        "<hl>Start thinkering! &#x1F9D0;</hl>",
        "We don't just move data... we interpret data, all the time.",
        "It's all about causal relationships, essential for robust and scalable solutions."
    ],
},{
    title: 'my degree &#x1F393;',
    content: [
        "My degree regards computer science and automation engineering",
        "Contextually my <hl>thesis brings automation to video streaming</hl>, aiming to make the distribution process more efficient and suitable for congested networks in the last-mile-delivery",
        "currently WIP ~ aiming to share everything &#x1F308;"
    ],
},{
    title: 'willing to help &#x2B50;',
    content: [
        "whatever I my work is, I do the most to <hl>share it</hl>. It's foundational that critical code bases stay opened.",
        button_list([
            { title: 'stateful-heaven', caption: 'custom-made SSR web framework', tech_stack: ["htmx", "TypeScript", "MongoDB", "swagger"] },
            { title: 'kiosk-sse-playlist', caption: 'chromium based video playout', tech_stack: ["TypeScript", "WebAPI", "<a target=_blank href='https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API'>MSE</a>", "<a target=_blank href='https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events'>SSE</a>"] }
        ]),
        button_list([
            { title: 'optimusq', caption: 'queue management for stores, with display and stations endpoints in Qt', tech_stack: ["Python"] }
        ]),
        button_list([
            { title: 'spotimeet', caption: 'social network in MongoDB and React blending many external data from Spotify', tech_stack: ["React", "ExpressJS", "MongoDB"] }
        ]),
        "many many other <b>little ~ crazy ~ fancy</b> tools",
        button_list([
            { title: 'cmaf-tcp', caption: 'studying video distribution, syncing players across the networks', tech_stack: ["Golang"]},
            { title: 'horizon-seek', caption: 'playground for researches in Computer vision with OpenCV', tech_stack: ["Python"]}
        ]),
        button_list([
            { title: 'obs-blank', caption: 'your production mixer <i>Fades to black</i>? Let OBS show a peaceful standby message', tech_stack: ["Golang"] },
            { title: 'wordpress-bash', caption: 'crazy tool for double checking your audience is up to date with the news', tech_stack: ["Bash", "filesystem&#x1F606;"] }
        ]),
        button_list([
            { title: 'portfolio', caption: 'hey I just built my portfolio so easily maitainable (but a bit too quickly)', tech_stack: ["Typescript", "CSS"] },
        ]),
        button_list([
            { title: 'GitHub', caption: "Whenever you're looking for me... you find me here!", tech_stack: [], link: "https://github.com/feddynventor" },
        ])
    ]
},{
    title: 'hit me up! &#x1F680;',
    content: [
        button_list([
            { title: 'Telegram', caption: "ready to ear from you!", tech_stack: [], link: "https://t.me/feddynventor" },
        ]),
        "made by feddy in one morning... because I feel inspired so randomly"
    ]
}] as ParagraphType[];
