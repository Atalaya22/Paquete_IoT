/****** Object:  Table [dbo].[Info_MXP_Estats]    Script Date: 2/13/2021 9:26:55 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Info_Estats](
	[Id] [int] NOT NULL,
	[Nom] [varchar](100) NULL,
	[Color] [varchar](100) NULL,
	[Ca] [varchar](100) NULL,
	[Es] [varchar](100) NULL,
	[En] [varchar](100) NULL,
 CONSTRAINT [PK_Info_Estats] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
GO
INSERT [dbo].[Info_Estats] ([Id], [Nom], [Color], [Ca], [Es], [En]) VALUES (0, N'UNKNOWN', N'purple', N'Desconegut', N'Desconocido', N'Unknown')
INSERT [dbo].[Info_Estats] ([Id], [Nom], [Color], [Ca], [Es], [En]) VALUES (1, N'Suspended', N'#3AC93A', N'Esperant', N'Esperando', N'Waiting')
INSERT [dbo].[Info_Estats] ([Id], [Nom], [Color], [Ca], [Es], [En]) VALUES (2, N'STOPPED', N'blue', N'Aturat', N'Parado', N'Stopped')
INSERT [dbo].[Info_Estats] ([Id], [Nom], [Color], [Ca], [Es], [En]) VALUES (3, N'RESETING', N'#f9feae', N'Restablint', N'Restableciendo', N'Reseting')
INSERT [dbo].[Info_Estats] ([Id], [Nom], [Color], [Ca], [Es], [En]) VALUES (4, N'EXECUTE', N'green', N'En funcionament', N'En funcionamiento', N'Running')
INSERT [dbo].[Info_Estats] ([Id], [Nom], [Color], [Ca], [Es], [En]) VALUES (5, N'FORMATCHANGE', N'#fec0df', N'Canvi de format', N'Cambio de formato', N'Format changing')
INSERT [dbo].[Info_Estats] ([Id], [Nom], [Color], [Ca], [Es], [En]) VALUES (6, N'ABORTED', N'red', N'Interromput', N'Interrumpido', N'Aborted')
INSERT [dbo].[Info_Estats] ([Id], [Nom], [Color], [Ca], [Es], [En]) VALUES (7, N'HELD', N'yellow', N'Retingut', N'Retenido', N'Held')
GO
