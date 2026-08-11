import { NextRequest, NextResponse } from "next/server"
import { generateAIResponse, generateProjectExplanation, generateRecruiterSummary, searchProjects } from "@/lib/ai-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, messages, projectName, summaryType, searchQuery } = body

    // Validate request
    if (!type) {
      return NextResponse.json(
        { error: "Missing request type" },
        { status: 400 }
      )
    }

    let response

    switch (type) {
      case "chat":
        if (!messages || !Array.isArray(messages)) {
          return NextResponse.json(
            { error: "Invalid messages format" },
            { status: 400 }
          )
        }
        response = await generateAIResponse(messages)
        break

      case "project-explanation":
        if (!projectName) {
          return NextResponse.json(
            { error: "Missing project name" },
            { status: 400 }
          )
        }
        response = await generateProjectExplanation(projectName)
        break

      case "recruiter-summary":
        if (!summaryType) {
          return NextResponse.json(
            { error: "Missing summary type" },
            { status: 400 }
          )
        }
        response = await generateRecruiterSummary(summaryType)
        break

      case "project-search":
        if (!searchQuery) {
          return NextResponse.json(
            { error: "Missing search query" },
            { status: 400 }
          )
        }
        const projects = searchProjects(searchQuery)
        return NextResponse.json({ projects })

      default:
        return NextResponse.json(
          { error: "Invalid request type" },
          { status: 400 }
        )
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("AI API error:", error)
    return NextResponse.json(
      { 
        error: "Internal server error",
        message: "Something went wrong. Please try again."
      },
      { status: 500 }
    )
  }
}
