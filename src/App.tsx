import { useState, type JSX, type ReactNode } from "react"
import heroImg from "#/assets/hero.png"
import reactLogo from "#/assets/react.svg"
import viteLogo from "#/assets/vite.svg"

function ActionLink({ children, href }: { children: ReactNode; href: string }): JSX.Element {
  return (
    <a
      className="
        flex items-center gap-8 rounded-6 bg-bg-secondary px-12 py-6 text-16
        text-text-primary no-underline transition-shadow duration-300
        hover:shadow-5
        max-1024:w-full max-1024:justify-center
      "
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      {children}
    </a>
  )
}

function App(): JSX.Element {
  const [count, setCount] = useState(0)

  return (
    <>
      <section
        className="
          flex grow flex-col items-center justify-center gap-24
          max-1024:gap-16 max-1024:px-20 max-1024:pt-32 max-1024:pb-24
        "
        id="center"
      >
        <div className="relative">
          <img
            alt=""
            className="relative inset-x-0 z-0 mx-auto w-[170px]"
            height="179"
            src={heroImg}
            width="170"
          />
          <img
            alt="React logo"
            className="
              absolute inset-x-0 top-[34px] z-10 mx-auto h-28
              [transform:perspective(2000px)_rotateZ(300deg)_rotateX(44deg)_rotateY(39deg)_scale(1.4)]
            "
            src={reactLogo}
          />
          <img
            alt="Vite logo"
            className="
              absolute inset-x-0 top-[107px] z-0 mx-auto h-[26px] w-auto
              [transform:perspective(2000px)_rotateZ(300deg)_rotateX(40deg)_rotateY(39deg)_scale(0.8)]
            "
            src={viteLogo}
          />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/app.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          className="
            mb-24 inline-flex rounded-4 border-2 border-transparent bg-primary-3
            px-10 py-6 font-code text-16 text-primary transition-[border-color]
            duration-300
            hover:border-primary-8
            focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-primary
          "
          onClick={() => setCount((count) => count + 1)}
          type="button"
        >
          Count is {count}
        </button>
      </section>

      <Ticks />

      <section
        className="
          flex border-t border-border text-left
          max-1024:flex-col max-1024:text-center
        "
        id="next-steps"
      >
        <div
          className="
            flex-1 border-r border-border p-32
            max-1024:border-r-0 max-1024:border-b max-1024:px-20 max-1024:py-24
          "
          id="docs"
        >
          <svg aria-hidden="true" className="mb-16 size-24" role="presentation">
            <use href="/icons.svg#documentation-icon" />
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul
            className="
              mt-32 flex gap-8
              max-1024:mt-20 max-1024:flex-wrap max-1024:justify-center
            "
          >
            <li className="max-1024:flex-1 max-1024:basis-[calc(50%-8px)]">
              <ActionLink href="https://vite.dev/">
                <img alt="" className="h-16" src={viteLogo} />
                Explore Vite
              </ActionLink>
            </li>
            <li className="max-1024:flex-1 max-1024:basis-[calc(50%-8px)]">
              <ActionLink href="https://react.dev/">
                <img alt="" className="size-16" src={reactLogo} />
                Learn React
              </ActionLink>
            </li>
          </ul>
        </div>
        <div
          className="
            flex-1 p-32
            max-1024:px-20 max-1024:py-24
          "
          id="social"
        >
          <svg aria-hidden="true" className="mb-16 size-24" role="presentation">
            <use href="/icons.svg#social-icon" />
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul
            className="
              mt-32 flex gap-8
              max-1024:mt-20 max-1024:flex-wrap max-1024:justify-center
            "
          >
            <li className="max-1024:flex-1 max-1024:basis-[calc(50%-8px)]">
              <ActionLink href="https://github.com/vitejs/vite">
                <SocialIcon href="/icons.svg#github-icon" />
                GitHub
              </ActionLink>
            </li>
            <li className="max-1024:flex-1 max-1024:basis-[calc(50%-8px)]">
              <ActionLink href="https://chat.vite.dev/">
                <SocialIcon href="/icons.svg#discord-icon" />
                Discord
              </ActionLink>
            </li>
            <li className="max-1024:flex-1 max-1024:basis-[calc(50%-8px)]">
              <ActionLink href="https://x.com/vite_js">
                <SocialIcon href="/icons.svg#x-icon" />
                X.com
              </ActionLink>
            </li>
            <li className="max-1024:flex-1 max-1024:basis-[calc(50%-8px)]">
              <ActionLink href="https://bsky.app/profile/vite.dev">
                <SocialIcon href="/icons.svg#bluesky-icon" />
                Bluesky
              </ActionLink>
            </li>
          </ul>
        </div>
      </section>

      <Ticks />
      <section
        className="
          h-80 border-t border-border
          max-1024:h-48
        "
        id="spacer"
      />
    </>
  )
}

function SocialIcon({ href }: { href: string }): JSX.Element {
  return (
    <svg
      aria-hidden="true"
      className="
        size-16
        dark:brightness-200 dark:invert
      "
      role="presentation"
    >
      <use href={href} />
    </svg>
  )
}

function Ticks(): JSX.Element {
  return <div className="ticks" />
}

export default App
