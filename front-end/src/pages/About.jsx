import React from 'react';

const links = [
  { name: 'Open roles', href: '#' },
  { name: 'Internship program', href: '#' },
  { name: 'Our values', href: '#' },
  { name: 'Meet our leadership', href: '#' },
];

const stats = [
  { name: 'Offices worldwide', value: '12' },
  { name: 'Full-time colleagues', value: '300+' },
  { name: 'Hours per week', value: '40' },
  { name: 'Paid time off', value: 'Unlimited' },
];

export default function AboutUs() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <img
        alt="Background"
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left side: Text content */}
          <div className="space-y-6 lg:space-y-8">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">About Us</h2>
            <p className="text-lg leading-8 text-gray-300">
              Welcome to SunVolt, where we are dedicated to empowering a sustainable future through clean, renewable energy solutions. Discover more about our mission and how we are making a difference in the world of solar energy.
            </p>
            <div className="space-y-6 lg:space-y-8">
              <div className="grid grid-cols-1 gap-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 lg:grid-cols-2">
                {links.map((link) => (
                  <a key={link.name} href={link.href} className="hover:text-gray-400 transition-colors">
                    {link.name} <span aria-hidden="true">&rarr;</span>
                  </a>
                ))}
              </div>
              <dl className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.name} className="flex flex-col text-center">
                    <dt className="text-base leading-7 text-gray-300">{stat.name}</dt>
                    <dd className="text-2xl font-bold leading-9 tracking-tight text-white">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Right side: Video content */}
          <div className="video-container mt-10 lg:mt-0 flex justify-center items-center">
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/cLR6ZpEr3P0"
              title="Power Your Home with Sunvolt"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg shadow-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
