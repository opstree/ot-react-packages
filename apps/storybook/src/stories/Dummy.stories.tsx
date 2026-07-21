import type { Meta, StoryObj } from "@storybook/react";

const DummyComponent = ({ text }: { text: string }) => (
  <div style={{ padding: "20px", background: "var(--bg)", color: "var(--foreground)" }}>
    <h3>Dummy Component</h3>
    <p>{text}</p>
  </div>
);

const meta: Meta<typeof DummyComponent> = {
  title: "Test/Dummy",
  component: DummyComponent,
};

export default meta;
type Story = StoryObj<typeof DummyComponent>;

export const Default: Story = {
  args: {
    text: "Storybook is working locally!",
  },
};
