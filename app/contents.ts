import { ParagraphType } from "./paragraph";
import { Carousel } from "./carousel";

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
const video = (src: string): HTMLDivElement => {
    const el = document.createElement('div') as HTMLDivElement;
    el.classList.add("video")
    const vid = document.createElement('video') as HTMLVideoElement;
    vid.muted = true
    vid.loop = true
    vid.autoplay = true
    vid.setAttribute("src", src)
    el.appendChild(vid)
    vid.play()
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
        "Travelling frees my <b>spirit</b> &#x1F1EE;&#x1F1E9; &#x1F1F2;&#x1F1E6; &#x1F1E9;&#x1F1EA; &#x1F1EA;&#x1F1F8; &#x1F1F3;&#x1F1F1; &#x1F1EC;&#x1F1E7;"
    ],
},{
    title: 'my work &#x1F529;',
    content: [
        "I've realized a <hl>video playout</hl> system for a <b>local broadcaster</b> <a href='https://news24.city'>news24.city</a> based on chromium and leveraging linux",
        "I've integrated <hl>new production processes</hl> so satisfing compliance with the <b>Hybrid Broadcast Broadband TV</b> standard. Here I've mastered transpilation and <hl>Node.js toolchains</hl>",
        "I've streamlined processes at <b><a href='https://telesveva.it'>Telesveva</a></b> with a <hl>custom-made framework for CMS</hl> with typescript and htmx",
        video('app/assets/videos/telesveva.webm'),
        video('app/assets/videos/news24.webm'),
        video('app/assets/videos/cms.webm')
    ]
},{
    title: 'stop abstracting &#x1F3A8;',
    content: [
        "<hl>Start thinkering! &#x1F9D0;</hl>",
        "We don't just move data... we interpret data, all the time.",
        "It's all about causal relationships, essential for robust and scalable solutions."
    ],
},{
    title: 'willing to help &#x2B50;',
    content: [
        "whatever I my work is, I do the most to <hl>share it</hl>. It's foundational that critical code bases stay opened.",
        button_list([
            { title: 'stateful-heaven', caption: 'custom-made SSR web framework', tech_stack: ["htmx", "TypeScript", "MongoDB", "swagger"] },
            { title: 'kiosk-sse-playlist', caption: 'chromium based video playout', tech_stack: ["TypeScript", "<a target=_blank href='https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API'>MSE</a>", "<a target=_blank href='https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events'>SSE</a>"] }
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
