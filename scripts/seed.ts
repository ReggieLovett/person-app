import prisma from "../lib/prisma";

async function main() {
  console.log("🌱 Seeding database with sample data...");

  const samplePeople = [
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "555-1234",
      age: 28,
      city: "San Francisco",
      bio: "Software engineer passionate about web development",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      phone: "555-5678",
      age: 32,
      city: "New York",
      bio: "Product manager with 10 years of experience",
    },
    {
      firstName: "Robert",
      lastName: "Johnson",
      email: "robert.johnson@example.com",
      phone: "555-9012",
      age: 45,
      city: "Los Angeles",
      bio: "Designer and creative director",
    },
    {
      firstName: "Emily",
      lastName: "Williams",
      email: "emily.williams@example.com",
      phone: "555-3456",
      age: 26,
      city: "Chicago",
      bio: "Full-stack developer exploring new technologies",
    },
    {
      firstName: "Michael",
      lastName: "Brown",
      email: "michael.brown@example.com",
      phone: "555-7890",
      age: 35,
      city: "Boston",
      bio: "Data scientist and machine learning enthusiast",
    },
    {
      firstName: "Sarah",
      lastName: "Davis",
      email: "sarah.davis@example.com",
      phone: "555-2468",
      age: 29,
      city: "Seattle",
      bio: "Marketing specialist with digital expertise",
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
