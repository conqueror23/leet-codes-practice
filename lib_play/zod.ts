/**
 * Zod — TypeScript-first schema validation with static type inference.
 *
 * Zod lets you declare a schema once and get BOTH:
 *   1. Runtime validation  (checks unknown data at runtime, e.g. API responses)
 *   2. Static TypeScript types  (inferred from the schema — no duplicate typing)
 *
 * Installed version here: zod v4  ->  import { z } from "zod"
 *
 * Run this file:
 *   npx ts-node lib_play/zod.ts
 */

import { z } from "zod";

/* ------------------------------------------------------------------ *
 * 1. Primitives & basic parsing
 * ------------------------------------------------------------------ */
const nameSchema = z.string();

// .parse() returns the value if valid, THROWS a ZodError if not.
console.log(nameSchema.parse("Alice")); // "Alice"

// .safeParse() never throws — returns a discriminated result object.
const result = nameSchema.safeParse(42);
if (!result.success) {
  console.log("safeParse failed:", result.error.issues[0].message);
} else {
  console.log("value:", result.data);
}

/* ------------------------------------------------------------------ *
 * 2. Object schema + type inference
 * ------------------------------------------------------------------ */
const UserSchema = z.object({
  id: z.number().int().positive(),
  username: z.string().min(3).max(20),
  email: z.email(), // built-in email validation (zod v4)
  age: z.number().min(0).max(120).optional(), // may be undefined
  role: z.enum(["admin", "user", "guest"]).default("user"),
  isActive: z.boolean().default(true),
});

// Infer the TypeScript type straight from the schema — single source of truth.
type User = z.infer<typeof UserSchema>;
// Equivalent to:
// type User = {
//   id: number;
//   username: string;
//   email: string;
//   age?: number | undefined;
//   role: "admin" | "user" | "guest";
//   isActive: boolean;
// };

const parsedUser: User = UserSchema.parse({
  id: 1,
  username: "bolong",
  email: "bolong@example.com",
  // age omitted -> optional
  // role omitted -> defaults to "user"
  // isActive omitted -> defaults to true
});
console.log("parsed user:", parsedUser);

/* ------------------------------------------------------------------ *
 * 3. Validating "unknown" data (the real-world use case)
 *    e.g. data coming from fetch(), JSON.parse(), req.body, localStorage...
 * ------------------------------------------------------------------ */
function handleApiResponse(raw: unknown): User | null {
  const check = UserSchema.safeParse(raw);
  if (!check.success) {
    console.error("Invalid API payload:", z.treeifyError(check.error));
    return null;
  }
  // Inside this branch, check.data is fully typed as User.
  return check.data;
}

handleApiResponse({ id: -5, username: "x", email: "not-an-email" });
console.log("valid?", handleApiResponse({
  id: 2,
  username: "wayne",
  email: "wayne@example.com",
  role: "admin",
}));

/* ------------------------------------------------------------------ *
 * 4. Arrays, nested objects, records, tuples
 * ------------------------------------------------------------------ */
const TodoSchema = z.object({
  title: z.string(),
  done: z.boolean(),
  tags: z.array(z.string()), // string[]
  coordinate: z.tuple([z.number(), z.number()]), // [number, number]
  meta: z.record(z.string(), z.unknown()), // { [k: string]: unknown }
  author: z.object({ name: z.string(), id: z.number() }), // nested object
});
type Todo = z.infer<typeof TodoSchema>;

const todo: Todo = TodoSchema.parse({
  title: "Learn Zod",
  done: false,
  tags: ["typescript", "validation"],
  coordinate: [10, 20],
  meta: { priority: "high" },
  author: { name: "Alice", id: 1 },
});
console.log("todo:", todo);

/* ------------------------------------------------------------------ *
 * 5. Unions, discriminated unions, literals
 * ------------------------------------------------------------------ */
const StringOrNumber = z.union([z.string(), z.number()]); // string | number
console.log(StringOrNumber.parse("hi"), StringOrNumber.parse(7));

// Discriminated union — efficient & great error messages.
const ShapeSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("circle"), radius: z.number() }),
  z.object({ kind: z.literal("rectangle"), width: z.number(), height: z.number() }),
]);
type Shape = z.infer<typeof ShapeSchema>;

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
  }
}
console.log("circle area:", area(ShapeSchema.parse({ kind: "circle", radius: 2 })));

/* ------------------------------------------------------------------ *
 * 6. Transforms, refinements & coercion
 * ------------------------------------------------------------------ */
// .transform() — reshape data after validation.
const TrimmedLower = z.string().transform((s) => s.trim().toLowerCase());
console.log(TrimmedLower.parse("  HeLLo  ")); // "hello"

// .refine() — custom validation rule with a message.
const PasswordSchema = z
  .string()
  .min(8)
  .refine((val) => /[0-9]/.test(val), {
    message: "Password must contain at least one number",
  });
console.log(PasswordSchema.safeParse("weakpass").success); // false
console.log(PasswordSchema.safeParse("strong1pass").success); // true

// z.coerce — coerce input into a type (useful for query params / env vars,
// which arrive as strings).
const PortSchema = z.coerce.number().int().min(1).max(65535);
console.log(PortSchema.parse("8080")); // 8080 (number, not string)

/* ------------------------------------------------------------------ *
 * 7. Schema composition: extend / pick / omit / partial / merge
 * ------------------------------------------------------------------ */
const BaseEntity = z.object({
  id: z.number(),
  createdAt: z.date(),
});

// .extend() — add fields
const Article = BaseEntity.extend({
  title: z.string(),
  body: z.string(),
});

// .pick() / .omit() — select or drop fields
const ArticlePreview = Article.pick({ id: true, title: true });
const ArticleWithoutBody = Article.omit({ body: true });

// .partial() — make every field optional (great for PATCH / update payloads)
const ArticleUpdate = Article.partial();

console.log("preview keys:", Object.keys(ArticlePreview.shape));
console.log("update accepts empty object?", ArticleUpdate.safeParse({}).success);
void ArticleWithoutBody;

/* ------------------------------------------------------------------ *
 * 8. Practical: parse environment variables at startup
 * ------------------------------------------------------------------ */
const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(3000),
  DEBUG: z
    .string()
    .optional()
    .transform((v) => v === "true"),
});

const env = EnvSchema.parse({
  NODE_ENV: "production",
  PORT: "4000",
  DEBUG: "true",
});
console.log("env config:", env); // { NODE_ENV: 'production', PORT: 4000, DEBUG: true }
