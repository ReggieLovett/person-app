import prisma from "../lib/prisma";

async function main() {
  console.log("🌱 Seeding database with sample data...");

  const samplePeople = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      age: 28,
      phone: "+1-555-0101",
      position: "Senior Developer",
      department: "Engineering",
      bio: "Full-stack developer with 5 years of experience",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      age: 32,
      phone: "+1-555-0102",
      position: "Product Manager",
      department: "Product",
      bio: "Passionate about user-centric design and innovation",
    },
    {
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      age: 45,
      phone: "+1-555-0103",
      position: "Engineering Lead",
      department: "Engineering",
      bio: "Leading technical teams and architectural decisions",
    },
    {
      name: "Emily Williams",
      email: "emily.williams@example.com",
      age: 26,
      phone: "+1-555-0104",
      position: "Junior Designer",
      department: "Design",
      bio: "Creating beautiful and intuitive user interfaces",
    },
    {
      name: "Michael Brown",
      email: "michael.brown@example.com",
      age: 35,
      phone: "+1-555-0105",
      position: "Sales Manager",
      department: "Sales",
      bio: "Building strong client relationships and driving revenue",
    },
    {
      name: "Sarah Davis",
      email: "sarah.davis@example.com",
      age: 29,
      phone: "+1-555-0106",
      position: "Marketing Specialist",
      department: "Marketing",
      bio: "Data-driven marketing strategist and content creator",
    },
  ];

  try {
    // Clear existing data
    await prisma.person.deleteMany({});
    console.log("✓ Cleared existing data");

    // Create sample people
    for (const person of samplePeople) {
      await prisma.person.create({
        data: person,
      });
    }

    console.log(`✓ Created ${samplePeople.length} sample people`);
    console.log("✓ Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
