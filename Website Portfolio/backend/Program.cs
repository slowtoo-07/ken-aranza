var builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseUrls("http://localhost:5080");
var app = builder.Build();

var profile = new Profile(
    Name: "John Kenneth M. Aranza",
    Title: "Information Technology Student and Aspiring Web Developer",
    Location: "Kimantong, Daraga, Albay, Philippines",
    Email: "kennetharanza4@gmail.com",
    Phone: "+63 930 865 8098",
    Socials: new[]
    {
        new Social("LinkedIn", "https://www.linkedin.com/in/john-kenneth-aranza"),
        new Social("GitHub", "https://github.com/slowtoo-07"),
        new Social("Instagram", "https://www.instagram.com/kengalunggong")
    },
    Summary: new[]
    {
        "I am an Information Technology student at STI College Legazpi. I built the Basic Education Resources and Inputs Monitoring System for the Department of Education as my capstone project.",
        "I am applying for the Web Developer role at PANDR Outsourcing, where I can build reliable, user-friendly web applications and contribute to the team’s success."
    },
    Experience: new[]
    {
        new Entry("BS Information Technology", "STI College Legazpi, Cabangan, Legazpi City", "Expected July 2027"),
        new Entry("Capstone Project Developer", "Basic Education Resources and Inputs Monitoring System", "2025–2026"),
        new Entry("Java Fundamentals Certification", "Oracle Academy", "July 2024"),
        new Entry("Storekeeper (Summer Job)", "Omni Electrical & Lightning Bicol, Tagas, Daraga, Albay", "June–July 2024"),
        new Entry("Senior High School, Humanities and Social Sciences", "Daraga National High School", "July 2023")
    },
    Stack: new[]
    {
        new Group("Programming languages", new[] { "Python", "C#" }),
        new Group("Web development", new[] { "HTML", "React" }),
        new Group("Cloud and tools", new[] { "AWS Management Console", "AWS Pricing Calculator" }),
        new Group("Database", new[] { "Postgres" }),
        new Group("Soft skills", new[] { "Communication", "Attention to detail", "Punctuality", "Teamwork", "Problem-solving" })
    },
    Projects: new[]
    {
        new Project("Basic Education Resources and Inputs Monitoring System", "2025–2026 · Capstone, STI College Legazpi",
            new[]
            {
                "Automates and integrates data on classrooms, seats, computers, and school equipment.",
                "Supports inventory management and data-driven planning by tracking existing resources and new deliveries, while keeping data accurate and secure."
            }, "/projects/landingpages.png"),
        new Project("Portfolio Website", "2026 · React and ASP.NET Core",
            new[] { "This site: a React frontend served by a C# API, designed for easy reading." })
    },
    Certifications: new[] { new Entry("Java Fundamentals", "Oracle Academy", "July 2024") },
    Goals: new[]
    {
        "Join PANDR Outsourcing as a Web Developer and grow with the team.",
        "Build reliable, user-friendly web applications that people of every age can use."
    },
    Gallery: new[]
    {
        new Photo("/gallery/pic1.jpg", "Team photo with medals at the STI College Legazpi Intramurals"),
        new Photo("/gallery/pic2.jpg", "Holding the 1st runner-up trophy and prize check at the Legends Unleashed Mobile Legends tournament"),
        new Photo("/gallery/pic3.jpg", "Two cats resting together on a white floor"),
        new Photo("/gallery/pic4.jpg", "A calico cat sleeping on its back on a brown blanket"),
        new Photo("/gallery/pic5.jpg", "Mirror photo in a blue Batman shirt and black sneakers"),
        new Photo("/gallery/pic6.jpg", "Grand Champion certificate from the REBOOT 2026 Mobile Legends tournament at STI College Legazpi")
    });

app.MapGet("/api/profile", () => profile);

app.MapPost("/api/contact", (ContactMessage m, ILogger<Program> log) =>
{
    if (string.IsNullOrWhiteSpace(m.Name) || string.IsNullOrWhiteSpace(m.Message) || !(m.Email ?? "").Contains('@'))
        return Results.BadRequest(new { message = "Please enter your name, a valid email, and a message." });
    log.LogInformation("Contact from {Name} <{Email}>: {Message}", m.Name, m.Email, m.Message);
    return Results.Ok(new { message = "Thank you. Your message was sent." });
});

app.Run();

record Entry(string Title, string Place, string Date);
record Group(string Name, string[] Items);
record Project(string Name, string Period, string[] Points, string? Image = null);
record ContactMessage(string? Name, string? Email, string? Message);
record Profile(string Name, string Title, string Location, string Email, string Phone, Social[] Socials,
    string[] Summary, Entry[] Experience, Group[] Stack, Project[] Projects, Entry[] Certifications, string[] Goals, Photo[] Gallery);
record Photo(string Src, string Alt);
record Social(string Name, string Url);
