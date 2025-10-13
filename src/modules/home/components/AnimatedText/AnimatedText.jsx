import Typewriter from 'typewriter-effect'
import './styles.css'

export const AnimatedText = () => {
  const typeText =
    'font-mono text-[1rem] md:text-xl leading-loose text-gray-200 p-2'

  return (
    <div className='flex items-center justify-center text-center aspect-auto'>
      <div className={typeText}>
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              // .pauseFor(300)
              // .typeString(
              //   '<span>console.log("<span class="string">¡Hola Mundo!</span>")</span>'
              // )
              .pauseFor(300)
              .deleteAll('natural')
              .typeString(
                '<span>print("<span class="string">¡Hola Mundo!</span>")</span>'
              )
              .deleteAll('natural')
              .typeString(
                '<span>puts "<span class="string">Hello World!</span>"</span>'
              )
              .deleteAll('natural')
              .typeString(
                '<span>echo "<span class="string">こんにちは世界</span>"</span>'
              )
              .pauseFor(300)
              .start()
          }}
          options={{
            autoStart: true,
            loop: true,
          }}
        />
      </div>
    </div>
  )
}
