FROM mcr.microsoft.com/devcontainers/base:ubuntu

ENV DENO_INSTALL=/home/vscode/.deno

RUN curl -fsSL https://deno.land/install.sh | sh
ENV PATH=${DENO_INSTALL}/bin:${PATH}