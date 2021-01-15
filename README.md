# Whitespace exotic programming language interpreter

## About this repository
This repo contains my implementation of Whitespace interpreter for CodeWars.com Kata.
Kata's path: https://www.codewars.com/kata/52dc4688eca89d0f820004c6

## About Whitespace

Whitespace is an esoteric programming language that uses only three characters:

1. [space] or " " (ASCII 32)
2. [tab] or "\t" (ASCII 9)
3. [line-feed] or "\n" (ASCII 10)

All other characters may be used for comments. The interpreter ignores them.

Whitespace is an imperative, stack-based programming language, including features such as subroutines.

Each command in whitespace begins with an Instruction Modification Parameter (IMP).

## Implemented IMPs:
- [x] IMP [space] - Stack Manipulation
- [x] IMP [tab][space] - Arithmetic
- [x] IMP [tab][tab] - Heap Access
- [x] IMP [tab][line-feed] - Input/Output
- [ ] IMP [line-feed] - Flow Control

[01.15.2021] Working in progress ...
