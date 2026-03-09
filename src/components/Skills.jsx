function Skills() {
  const skills = ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB", "Git"];

  return (
    <section className="py-20 bg-gray-900 text-white text-center">
      <h2 className="text-3xl font-bold mb-10">Skills</h2>

      <div className="flex flex-wrap justify-center gap-6">
        {skills.map((skill) => (
          <div
            key={skill}
            className="bg-gray-800 px-6 py-3 rounded-lg hover:bg-blue-500 transition"
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;