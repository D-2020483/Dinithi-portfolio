function Projects() {
  return (
    <section className="py-20 bg-gray-900 text-white text-center">
      <h2 className="text-3xl font-bold mb-10">Projects</h2>

      <div className="grid md:grid-cols-3 gap-8 px-10">

        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Inventory System</h3>
          <p className="text-gray-400">
            A system to manage products, orders, and reports.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">POS System</h3>
          <p className="text-gray-400">
            Point of Sale system for product management and billing.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Portfolio Website</h3>
          <p className="text-gray-400">
            Personal website built with React and Tailwind CSS.
          </p>
        </div>

      </div>
    </section>
  );
}

export default Projects;