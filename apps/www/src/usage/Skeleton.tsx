import React, { useState, useEffect } from 'react'
import Skeleton from '../components/docs/Skeleton'

const SkeletonUsage = () => {
  const [isLoading, setIsLoading] = useState(true)

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleReset = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 3000)
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-12">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Skeleton Component Usage</h1>
        <p className="text-gray-600">
          Skeleton loaders are used to display placeholder content while data is being loaded.
        </p>
      </div>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Text Skeleton</h2>
          <p className="text-sm text-gray-600 mb-4">
            Used for loading text content like titles, descriptions, and paragraphs.
          </p>
        </div>
        <div className="space-y-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton variant="text" width="60%" height={24} />
              <Skeleton variant="text" width="100%" height={16} />
              <Skeleton variant="text" width="90%" height={16} />
              <Skeleton variant="text" width="70%" height={16} />
            </div>
          ) : (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Article Title</h3>
              <p className="text-sm text-gray-600">
                This is sample content that was being loaded. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">2. Rectangular Skeleton (Card)</h2>
          <p className="text-sm text-gray-600 mb-4">
            Ideal for loading card components with images and text content.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isLoading ? (
            <>
              <div className="p-4 border border-gray-200 rounded-lg">
                <Skeleton variant="rectangular" width="100%" height={200} className="mb-3 rounded-md" />
                <Skeleton variant="text" width="80%" height={20} className="mb-2" />
                <Skeleton variant="text" width="100%" height={16} className="mb-2" />
                <Skeleton variant="text" width="60%" height={16} />
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <Skeleton variant="rectangular" width="100%" height={200} className="mb-3 rounded-md" />
                <Skeleton variant="text" width="80%" height={20} className="mb-2" />
                <Skeleton variant="text" width="100%" height={16} className="mb-2" />
                <Skeleton variant="text" width="60%" height={16} />
              </div>
            </>
          ) : (
            <>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="w-full h-[200px] bg-gradient-to-br from-blue-400 to-purple-500 rounded-md mb-3"></div>
                <h3 className="font-semibold mb-2">Card Title</h3>
                <p className="text-sm text-gray-600 mb-2">
                  This is the card content with loaded data.
                </p>
                <p className="text-xs text-gray-500">Click to learn more</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="w-full h-[200px] bg-gradient-to-br from-green-400 to-teal-500 rounded-md mb-3"></div>
                <h3 className="font-semibold mb-2">Another Card</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Loading complete, now showing real content.
                </p>
                <p className="text-xs text-gray-500">Click to learn more</p>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">3. Circular Skeleton (Avatar)</h2>
          <p className="text-sm text-gray-600 mb-4">
            Perfect for loading user avatars and profile images.
          </p>
        </div>
        <div className="space-y-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="flex items-center space-x-4">
            {isLoading ? (
              <>
                <Skeleton variant="circular" width={48} />
                <div className="flex-1 space-y-2">
                  <Skeleton variant="text" width="40%" height={16} />
                  <Skeleton variant="text" width="60%" height={14} />
                </div>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-red-500"></div>
                <div>
                  <p className="font-semibold">John Doe</p>
                  <p className="text-sm text-gray-600">john@example.com</p>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
            {isLoading ? (
              <>
                <Skeleton variant="circular" width={48} />
                <div className="flex-1 space-y-2">
                  <Skeleton variant="text" width="40%" height={16} />
                  <Skeleton variant="text" width="60%" height={14} />
                </div>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500"></div>
                <div>
                  <p className="font-semibold">Jane Smith</p>
                  <p className="text-sm text-gray-600">jane@example.com</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Example 4: Complex Loading State */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">4. Complex Loading State</h2>
          <p className="text-sm text-gray-600 mb-4">
            Combining multiple skeleton variants for complex UI layouts.
          </p>
        </div>
        <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
          {isLoading ? (
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center space-x-3">
                <Skeleton variant="circular" width={40} />
                <div className="flex-1">
                  <Skeleton variant="text" width="30%" height={16} className="mb-1" />
                  <Skeleton variant="text" width="50%" height={14} />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Skeleton variant="text" width="40%" height={20} />
                <Skeleton variant="text" width="100%" height={16} />
                <Skeleton variant="text" width="95%" height={16} />
              </div>

              {/* image */}
              <Skeleton variant="rectangular" width="100%" height={250} className="rounded-md" />

              {/* Footer */}
              <div className="flex space-x-2">
                <Skeleton variant="rectangular" width="100px" height={36} className="rounded" />
                <Skeleton variant="rectangular" width="100px" height={36} className="rounded" />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
                <div>
                  <p className="font-semibold text-sm">Component Demo</p>
                  <p className="text-xs text-gray-600">Ready to display</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Welcome to the Loaded Content!</h3>
                <p className="text-sm text-gray-600">
                  All data has been successfully loaded and is now displayed on the screen.
                  This skeleton loader helps improve perceived performance during loading states.
                </p>
              </div>

              <div className="w-full h-[250px] bg-gradient-to-br from-indigo-400 to-cyan-500 rounded-md"></div>

              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition">
                  Primary Action
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded text-sm hover:bg-gray-300 transition">
                  Secondary Action
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Control Button */}
      <div className="flex justify-center">
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          {isLoading ? 'Loading...' : 'Show Loading State Again'}
        </button>
      </div>

      {/* Code Example */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Code Example</h2>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
          <pre>{`import Skeleton from '@/components/docs/Skeleton'

// Text Skeleton
<Skeleton variant="text" width="100%" height={24} />

// Rectangular Skeleton
<Skeleton variant="rectangular" width={200} height={100} />

// Circular Skeleton
<Skeleton variant="circular" width={48} />

// With custom class
<Skeleton 
  variant="rectangular" 
  width="100%" 
  height={200} 
  className="rounded-md"
/>`}</pre>
        </div>
      </section>
    </div>
  )
}

export default SkeletonUsage
